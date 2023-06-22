// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import propertyModel from "@models/property.model";
import RealEstateNFTModel from "@models/realEstateNft.model";
import IroModel from "@models/iro.model";
import RealEstateAccountModel from "@models/realEstateAccount.model";

// Interfaces
import { Property, PropertyExtended, GetPropertiesPaginatedResult, Attributes } from "@interfaces/property.interface";
import { IROReduced, UserShare } from "@interfaces/iro.interface";
import { FilterQuery, PaginateOptions } from "mongoose";
import { User } from "@interfaces/users.interface";

// DTO
import { CreatePropertyDto, FinancialsInputDto } from "@dtos/property.dto";

// Blockchain interaction
import { ethers } from "ethers";

// SECRETS
import {
  ALCHEMY_KEY,
  IRO_CONTRACT_ADDRESS,
  RENFT_CONTRACT_ADDRESS,
  IRO_CREATION_BLOCK,
  RENFT_CREATION_BLOCK
} from "@/config";

// Get ABIs
import iroContractABI from "@/abis/iroABI.json";
import reNftContractABI from "@/abis/renftABI.json";

// Utils
import { isEmpty } from "@utils/util";
import BigNumber from "bignumber.js";

// Type extensions
import "./type-extensions/number.extensions";
import "./type-extensions/string.extensions";

// configure BigNumber constructor
BigNumber.config({ DECIMAL_PLACES: 2 });

// instantiate models
const iro = new IroModel();
const realEstateAccount = new RealEstateAccountModel();

const IRO_PROPOSAL_FIELDS = [
  "tokenSupply",
];

const ATTRIBUTES_FIELDS = [
  "area",
  "bedrooms",
  "bathrooms",
  "parking",
  "yearBuilt",
  "latitude",
  "longitude"
];

class PropertyService {
  // IRO constants
  static VACANCY_FEE_PERCENT = 2;
  static RENOVATION_RESERVES_PERCENT = 2;
  static TREASURY_FEE_PERCENT = 5;
  static UPFRONT_SPV_FEES = 2000; // 2000 USD
  static IRO_DURATION = 15 * 86400; // 15 days

  // Annual Gross Rents constants
  static PROPERTY_TAXES_PERCENT = 0.1;
  static INSURANCE_PERCENT = 0.5;
  static PROPERTY_MANAGEMENT_FEE_PERCENT = 8;
  static SPV_FEELING_FEES = 2000; // 2000 USD

  static rpcProvider = new ethers.AlchemyProvider("matic-mumbai", ALCHEMY_KEY);
  static iroContract = new ethers.Contract(IRO_CONTRACT_ADDRESS, iroContractABI, this.rpcProvider);
  static reNFtContract = new ethers.Contract(RENFT_CONTRACT_ADDRESS, reNftContractABI, this.rpcProvider);

  public async createProperty(createPropertyBody: CreatePropertyDto, user: User) {
    if (user.address !== createPropertyBody.creator)
      throw new HttpException(401, "Creator should be equal to user address");

    if (isEmpty(createPropertyBody)) throw new HttpException(400, "createPropertyBody is empty");

    createPropertyBody.financialInput.tokenPrice = 1; // TODO: Fix to 1 USDT for now
    const findOne = await propertyModel.findOne({ name: createPropertyBody.name });
    if (findOne) throw new HttpException(409, "Property already exist (by name)");

    const createPropertyData = await propertyModel.create(this.createPropertyBodyToPropertyStorage(createPropertyBody));

    return createPropertyData;
  }

  public async deleteProperty(propertyId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");

    const deletedData = await propertyModel.findByIdAndRemove(propertyId);

    return deletedData;
  }

  public async getPropertyFieldValues(fields: string[]) {
    const fieldToValues = {};
    for (const field of fields) {
      if (field === "status") {
        fieldToValues[field] = [
          "DUE_DILLIGENCE",
          "IRO",
          "TRADE"
        ];
        continue;
      }
      let searchField = field;
      if (IRO_PROPOSAL_FIELDS.includes(field)) searchField = "iroProposal." + searchField;
      else if (ATTRIBUTES_FIELDS.includes(field)) searchField = "attributes." + searchField;
      fieldToValues[field] = await propertyModel.distinct(searchField);
      fieldToValues[field].length > 0
        && typeof fieldToValues[field][0] === "number"
        && (
          fieldToValues[field] = {
            min: Math.min(...fieldToValues[field]),
            max: Math.max(...fieldToValues[field])
          });
    }
    return fieldToValues;
  }

  public async getPropertiesPaginated(
    filter: FilterQuery<Property>,
    options: PaginateOptions,
  ): Promise<GetPropertiesPaginatedResult> {
    const iros: { [iroId: string]: IROReduced } = {};
    if (!filter?.status || filter?.status !== "TRADE") {
      const iroQueryResult = await iro.getIrosByStatus(this.getSubgraphIroStatusFilter(filter));
      iroQueryResult.forEach((iro: any) => {
        iros[iro.iroId] = iro;
      });
      if (filter?.status) filter.iroIds = Object.keys(iros).map(id => parseInt(id));
    }

    const propertiesPagination = await propertyModel.paginate(this.formatQuery(filter), options);

    const results: GetPropertiesPaginatedResult = {
      paginationMetadata: {
        totalDocs: propertiesPagination.totalDocs,
        limit: propertiesPagination.limit,
        hasPrevPage: propertiesPagination.hasPrevPage,
        hasNextPage: propertiesPagination.hasNextPage,
        page: propertiesPagination.page,
        totalPages: propertiesPagination.totalPages,
        offset: propertiesPagination.offset,
        prevPage: propertiesPagination.prevPage,
        nextPage: propertiesPagination.nextPage,
        pagingCounter: propertiesPagination.pagingCounter,
      },
      docs: [],
    };

    if (Object.keys(iros).length > 0) {
      propertiesPagination.docs.forEach((doc: any) => {
        const property: PropertyExtended = { ...doc.toJSON() };
        property.status = this.getPropertyStatus(property);
        results.docs.push(property);
        if (property.status === "FUNDING") {
          const propertyIro: any = {};
          const iro = iros[doc.iroId];
          const totalFunding = this.adjustDecimals(iro.totalFunding, iro.currencyDecimals);
          const targetFunding = this.adjustDecimals(iro.targetFunding, iro.currencyDecimals);
          propertyIro.status = iro.status;
          iro.status !== "FUNDING" && (property.status = iro.status);
          propertyIro.tokenPrice = this.adjustDecimals(iro.unitPrice, iro.currencyDecimals).toFixed(2);
          propertyIro.currency = iro.currency;
          propertyIro.targetFunding = targetFunding.toFixed(2);
          propertyIro.start = iro.start;
          propertyIro.end = iro.end;
          propertyIro.totalFunding = totalFunding.toFixed(2);
          propertyIro.iroContractAddress = iro.iroContractAddress;
          property.iro = propertyIro;
          property.iro.fundingPercentage = totalFunding
            .multipliedBy(new BigNumber(100))
            .dividedBy(targetFunding)
            .toFixed(2);
        }
      });
    } else {
      results.docs = propertiesPagination.docs.map((property: any) => {
        const propertyExtended: PropertyExtended = { ...property.toJSON() };
        propertyExtended.status = this.getPropertyStatus(property);
        return propertyExtended;
      });
    }

    return results;
  }

  public async getPropertyById(propertyId: string): Promise<PropertyExtended> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");

    const property = (await propertyModel.findById(propertyId)).toJSON();
    if (!property) throw new HttpException(409, "Property doesn't exist");

    const result: PropertyExtended = { ...property };
    result.status = this.getPropertyStatus(result);
    if (result.status === "FUNDING") {
      const resultIro: any = {};
      const iroQueryResult = await iro.getIro(property.iroId.toString());
      const totalFunding = this.adjustDecimals(iroQueryResult.totalFunding, iroQueryResult.currencyDecimals);
      const targetFunding = this.adjustDecimals(iroQueryResult.targetFunding, iroQueryResult.currencyDecimals);
      resultIro.iroContractAddress = iroQueryResult.iroContractAddress;
      resultIro.status = iroQueryResult.status;
      iroQueryResult.status !== "FUNDING" && (result.status = iroQueryResult.status);
      resultIro.tokenPrice = this.adjustDecimals(iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toFixed(2);
      resultIro.currency = iroQueryResult.currency;
      resultIro.targetFunding = targetFunding.toFixed(2);
      resultIro.start = iroQueryResult.start;
      resultIro.end = iroQueryResult.end;
      resultIro.totalFunding = totalFunding.toFixed(2);
      resultIro.fundsWithdrawn = iroQueryResult.fundsWithdrawn;
      resultIro.operationFee = iroQueryResult.operationFee;
      resultIro.treasuryFee = iroQueryResult.treasuryFee;
      resultIro.listingOwner = iroQueryResult.listingOwner;
      resultIro.shares = this.populateSharesArray(iroQueryResult.shares, iroQueryResult.currencyDecimals);
      result.iro = resultIro;
      result.iro.participants = result.iro.shares.length.toString();
      result.iro.fundingPercentage = totalFunding.multipliedBy(new BigNumber(100)).dividedBy(targetFunding).toFixed(2);
    }

    return result;
  }

  public async getUserFundings(userAddress: string) {
    if (isEmpty(userAddress)) throw new HttpException(400, "userAddress is empty");

    const [userShares, iroIds] = await this.getUserSharesAndIroIds(userAddress);

    const iroProperties = await propertyModel.find({ iroId: { $in: iroIds } });
    if (!iroProperties) throw new HttpException(409, "No user funding found");

    const iroIdToPropertyMap = {};
    for (const iroProperty of iroProperties) {
      const item = iroProperty.toJSON();
      iroIdToPropertyMap[item.iroId.toString()] = item;
    }

    const results = [];
    for (const userShare of userShares) {
      const property = iroIdToPropertyMap[userShare.iro.iroId.toString()];

      if (property) {
        results.push({
          _id: property._id.toString(),
          name: property.name,
          type: property.type,
          status: userShare.iro.status,
          country: property.country,
          city: property.city,
          region: property.region,
          address: property.address,
          imageUrl: property.imageUrl,
          attributes: property.attributes,
          iroId: property.iroId,
          financials: property.financials,
          iro: {
            status: userShare.iro.status,
            userAmount: userShare.amount,
            userShare: userShare.share,
            userClaimed: userShare.claimed,
            currency: userShare.iro.currency,
            tokenPrice: this.adjustDecimals(userShare.iro.unitPrice, userShare.iro.currencyDecimals).toFixed(2),
            targetFunding: this.adjustDecimals(userShare.iro.targetFunding, userShare.iro.currencyDecimals).toFixed(2),
            start: userShare.iro.start,
            end: userShare.iro.end,
            totalFunding: this.adjustDecimals(userShare.iro.totalFunding, userShare.iro.currencyDecimals).toFixed(2),
            currentSupply: new BigNumber(userShare.iro.totalFunding).div(new BigNumber(userShare.iro.unitPrice)),
          },
        });
      }
    }

    return results;
  }

  public async getUserProperties(user: string) {
    if (isEmpty(user)) throw new HttpException(404, "Invalid user");

    const userAccounts = await realEstateAccount.getRealEstateAccounts(user);
    if (!userAccounts.length) throw new HttpException(409, "No real estate found for user");

    const tokenIdToBalanceMap: any = {};
    userAccounts[0].balances.forEach(balance => {
      Object.assign(tokenIdToBalanceMap, { [balance.tokenId]: balance.amount });
    });

    const properties = await propertyModel.find({ realEstateNftId: { $in: Object.keys(tokenIdToBalanceMap) } });

    const result: any = [];
    for (const property of properties) {
      result.push({
        ...property.toJSON(),
        balance: tokenIdToBalanceMap[property.realEstateNftId],
      });
    }

    return result;
  }

  public async getPropertyByName(name: string): Promise<Property> {
    if (isEmpty(name)) throw new HttpException(400, "name is empty");

    const property = (await propertyModel.findOne({ name })).toJSON();
    if (!property) throw new HttpException(409, "Property doesn't exist");

    const result: PropertyExtended = { ...property };
    result.status = this.getPropertyStatus(result);
    if (result.status === "FUNDING") {
      const iroQueryResult = await iro.getIro(property.iroId.toString());
      result.iro.status = iroQueryResult.status;
      iroQueryResult.status !== "FUNDING" && (result.status = iroQueryResult.status);
      result.iro.tokenPrice = this.adjustDecimals(iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toFixed(2);
      result.iro.currency = iroQueryResult.currency;
      result.iro.targetFunding = this.adjustDecimals(
        iroQueryResult.targetFunding,
        iroQueryResult.currencyDecimals,
      ).toFixed(2);
      result.iro.start = iroQueryResult.start;
      result.iro.end = iroQueryResult.end;
      result.iro.totalFunding = this.adjustDecimals(
        iroQueryResult.totalFunding,
        iroQueryResult.currencyDecimals,
      ).toString();
      result.iro.fundsWithdrawn = iroQueryResult.fundsWithdrawn;
      result.iro.operationFee = iroQueryResult.operationFee;
      result.iro.treasuryFee = iroQueryResult.treasuryFee;
      result.iro.listingOwner = iroQueryResult.listingOwner;
      result.iro.shares = this.populateSharesArray(iroQueryResult.shares, iroQueryResult.currencyDecimals);
    }

    return property;
  }

  // TODO: Implement some checks and DTO for updateBody param
  public async updatePropertyById(propertyId: string, updateBody): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(updateBody)) throw new HttpException(400, "updateBody is empty");
    updateBody.updatedAt = Date.now();
    updateBody.iroProposal.tokenPrice = 1; // Fixed to 1 USDT
    const updatedProperty = propertyModel.findByIdAndUpdate(propertyId, updateBody, { new: true });

    return updatedProperty;
  }

  public async setIroId(propertyId: string, iroId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(iroId)) throw new HttpException(400, "iroId is empty");
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      propertyId,
      {
        iroId,
        updatedAt: Date.now(),
      },
      { new: true },
    );
    return updatedProperty;
  }

  public async setRealEstateNftId(iroId: string, realEstateNftId: string) {
    if (isEmpty(iroId)) throw new HttpException(400, "iroId is empty");
    if (isEmpty(realEstateNftId)) throw new HttpException(400, "realEstateNftId is empty");

    const property = await propertyModel.findOne({ iroId });
    if (!property) throw new HttpException(409, "Property doesn't exist");

    if (property.realEstateNftId) throw new HttpException(400, "Real Estate NFT ID already set");
    const updatedProperty = (
      await propertyModel.findByIdAndUpdate(
        property.id,
        {
          realEstateNftId,
          updatedAt: Date.now(),
        },
        { new: true },
      )
    ).toJSON();

    const realEstateNft = await RealEstateNFTModel.create({
      _id: realEstateNftId,
      name: updatedProperty.name,
      description: updatedProperty.description,
      image: updatedProperty.imageUrl,
      attributes: this.formatAttributes(updatedProperty.attributes),
      external_url: `https://horizon-dao.io/asset/${property.id}`,
    });

    return realEstateNft;
  }

  public async deletePropertyById(propertyId: string): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    const removedProperty = <Property>(await propertyModel.findByIdAndRemove(propertyId)).toJSON();
    return removedProperty;
  }

  public async getUserHistory(userAddress: string) {
    if (isEmpty(userAddress)) throw new HttpException(400, "userAddress is empty");
    const userCommits = (await PropertyService.iroContract.queryFilter(
      PropertyService.iroContract.filters.Commit(null, userAddress, null),
      parseInt(IRO_CREATION_BLOCK)
    )).map((commitEvent: ethers.EventLog) => ({
      iroId: Number(commitEvent.args[0]),
      userAddress: commitEvent.args[1],
      value: commitEvent.args[3].toString(),
      purchasedAmount: commitEvent.args[4].toString(),
      blockNumber: commitEvent.blockNumber,
      type: "Commit",
      block: PropertyService.rpcProvider.getBlock(commitEvent.blockNumber),
      timestamp: undefined,
      property: undefined
    }));

    const userTransfersFrom = (await PropertyService.reNFtContract.queryFilter(
      PropertyService.reNFtContract.filters.TransferSingle(null, userAddress, null),
      parseInt(RENFT_CREATION_BLOCK)
    )).map((commitEvent: ethers.EventLog) => ({
      reNftId: Number(commitEvent.args[3]),
      operator: commitEvent.args[0],
      from: commitEvent.args[1],
      to: commitEvent.args[2],
      value: commitEvent.args[4].toString(),
      blockNumber: commitEvent.blockNumber,
      type: "Send",
      block: PropertyService.rpcProvider.getBlock(commitEvent.blockNumber),
      timestamp: undefined,
      property: undefined
    }));

    const userTransfersTo = (await PropertyService.reNFtContract.queryFilter(
      PropertyService.reNFtContract.filters.TransferSingle(null, null, userAddress),
      parseInt(RENFT_CREATION_BLOCK)
    )).map((commitEvent: ethers.EventLog) => ({
      reNftId: Number(commitEvent.args[3]),
      operator: commitEvent.args[0],
      from: commitEvent.args[1],
      to: commitEvent.args[2],
      value: commitEvent.args[4].toString(),
      blockNumber: commitEvent.blockNumber,
      type: "Receive",
      block: PropertyService.rpcProvider.getBlock(commitEvent.blockNumber),
      timestamp: undefined,
      property: undefined
    }));

    const reNFtIds = new Set();
    const iroIds = new Set();
    const result = [
      ...userCommits,
      ...userTransfersFrom,
      ...userTransfersTo
    ].sort((left, right) => {
      if (typeof left["iroId"] !== "undefined") iroIds.add(left["iroId"])
      else reNFtIds.add(left["reNftId"]);
      return right.blockNumber - left.blockNumber;
    });

    const idToProperty = {
      iroId: {},
      realEstateNftId: {}
    };
    (await propertyModel.find({
      $or: [
        { iroId: { $in: [...iroIds] } },
        { realEstateNftId: { $in: [...reNFtIds] } }
      ]
    })).forEach(property => {
      delete property._id;
      if (typeof property.iroId !== "undefined") {
        idToProperty["iroId"][property.iroId] = property.toJSON();
      }
      if (typeof property.realEstateNftId !== "undefined") {
        idToProperty["realEstateNftId"][property.realEstateNftId] = property.toJSON();
      }
    });
    for (const item of result) {
      item.timestamp = (await item.block).timestamp;
      if (typeof item["iroId"] !== "undefined") {
        item.property = idToProperty["iroId"][item["iroId"]];
      } else {
        item.property = idToProperty["realEstateNftId"][item["reNftId"]]
      }
      delete item.block;
    }

    return result;
  }

  private async getUserSharesAndIroIds(userAddress: string, iroStatuses: string[] = []) {
    let userShares = <Array<any>>await iro.getUserShare(userAddress);
    const iroIds: any[] = [];
    userShares = userShares.filter(userShare => {
      const isValid = iroStatuses.length === 0 || iroStatuses.includes(<string>userShare.iro.status);
      if (isValid) {
        iroIds.push(userShare.iro.iroId);
      }
      return isValid;
    });
    return [userShares, iroIds];
  }

  private getSubgraphIroStatusFilter(filter: any) {
    if (!filter.status || filter.status === "IRO") return ["FUNDING", "SUCCESS", "FAIL"];
    return [filter.status];
  }

  private formatQuery(filter: any) {
    const query = {};
    filter.status !== "DUE_DILLIGENCE"
      && filter.iroIds
      && filter.iroIds.length > 0
      && (query["iroId"] = { $in: filter.iroIds });
    filter.status && (() => {
      switch (filter.status) {
        case "DUE_DILLIGENCE":
          query["iroId"] = { $exists: false };
          return;
        case "IRO":
          if (!query["iroId"]) query["iroId"] = { iroId: { $exists: true } };
          query["realEstateNftId"] = { $exists: false };
          return;
        case "TRADE":
          if (!query["iroId"]) query["iroId"] = { iroId: { $exists: true } };
          query["realEstateNftId"] = { $exists: true };
          return;
        default:
          throw new HttpException(500, "Invalid status filter value");
      }
    });

    filter.type && (query["type"] = filter.type);

    filter.country && (query["country"] = filter.country);

    filter.tokenSupply && (
      query["iroProposal.tokenSupply"] = { $gte: filter.tokenSupply.min, $lte: filter.tokenSupply.max }
    );

    filter.area && (
      query["attributes.area"] = { $gte: filter.area.min, $lte: filter.area.max }
    );

    filter.bedrooms && (
      query["attributes.bedrooms"] = { $gte: filter.bedrooms.min, $lte: filter.bedrooms.max }
    );

    filter.bathrooms && (
      query["attributes.bathrooms"] = { $gte: filter.bathrooms.min, $lte: filter.bathrooms.max }
    );

    filter.parking && (
      query["attributes.parking"] = { $gte: filter.parking.min, $lte: filter.parking.max }
    );

    filter.latitude && (
      query["attributes.latitude"] = { $gte: filter.latitude.min, $lte: filter.latitude.max }
    );

    filter.longitude && (
      query["attributes.longitude"] = { $gte: filter.longitude.min, $lte: filter.longitude.max }
    );

    return query;
  }

  private createPropertyBodyToPropertyStorage(createPropertyBody: CreatePropertyDto) {
    const fees = this.calculateFeesFromAssetPrice(createPropertyBody.financialInput.assetPrice);
    const totalInvestmentValueTable = this.assembleTotalInvestmentValueTable(createPropertyBody.financialInput, fees);
    const annualGrossRentsTable = this.assembleAnnualGrossRentsTable(createPropertyBody.financialInput);
    const totalReturnsTable = this.assembleTotalReturnsTable(
      annualGrossRentsTable.annualCashflow,
      totalInvestmentValueTable.total,
    );
    return {
      name: createPropertyBody.name,
      description: this.assembleDescription(createPropertyBody),
      type: createPropertyBody.type,
      creator: createPropertyBody.creator,
      imageUrl: createPropertyBody.imageUrl,
      country: createPropertyBody.country,
      region: createPropertyBody.region,
      city: createPropertyBody.city,
      address: createPropertyBody.address,
      zip: createPropertyBody.zip,
      highlights: createPropertyBody.highlights,
      market: createPropertyBody.market,
      documentsUrl: createPropertyBody.documentsUrl,
      iroProposal: this.assembleIroProposal(createPropertyBody.financialInput, fees),
      attributes: createPropertyBody.attributes,
      financials: {
        totalInvestmentValue: totalInvestmentValueTable,
        totalReturns: totalReturnsTable,
        annualGrossRents: annualGrossRentsTable,
      },
    };
  }

  private assembleAnnualGrossRentsTable(financialsInput: FinancialsInputDto) {
    const annualCashflow = this.getAnnualCashflow(financialsInput.monthlyCashflow);
    const annualGrossRents: any = {
      propertyTaxes: PropertyService.PROPERTY_TAXES_PERCENT.percentOf(financialsInput.assetPrice).toFixedCeil(2),
      insurance: PropertyService.INSURANCE_PERCENT.percentOf(financialsInput.assetPrice).toFixedCeil(2),
      propertyManagement: PropertyService.PROPERTY_MANAGEMENT_FEE_PERCENT.percentOf(
        parseFloat(annualCashflow),
      ).toFixedCeil(2),
      spvFeelingFees: PropertyService.SPV_FEELING_FEES.toString(),
    };

    annualGrossRents.total = annualCashflow.minus(
      <string>Object.values(annualGrossRents).reduce((prev: string, next: string) => prev.add(next)),
    );
    Object.assign(annualGrossRents, {
      monthlyCashflow: financialsInput.monthlyCashflow.toFixedCeil(2),
      annualCashflow,
    });

    return annualGrossRents;
  }

  private assembleTotalReturnsTable(annualCashflow: string, totalInvestmentValue: string) {
    const totalReturns: any = {
      /* projectedAppreciationPercentage */
      cashOnCashReturnPercentage: annualCashflow.mul("100").div(totalInvestmentValue).numberToFixed(2),
    };
    totalReturns.totalPercentage = Object.values(totalReturns).reduce((prev: string, next: string): string =>
      prev.add(next),
    );
    return totalReturns;
  }

  private assembleTotalInvestmentValueTable(financialInput: FinancialsInputDto, fees) {
    const totalInvestmentValue: { [field: string]: string } = {
      assetPrice: financialInput.assetPrice.toFixedCeil(2),
      ...fees,
    };
    totalInvestmentValue.total = Object.values(totalInvestmentValue)
      .reduce((prev: string, next: string) => prev.add(next))
      .numberToFixed(2);

    return totalInvestmentValue;
  }

  private assembleDescription(createPropertyBody: CreatePropertyDto) {
    return (
      `Discover the future of real estate with this ${createPropertyBody.type} ` +
      `located at ${createPropertyBody.address}, ${createPropertyBody.city}, ` +
      `${createPropertyBody.region}, ${createPropertyBody.country} ` +
      `${createPropertyBody.zip}. With ${createPropertyBody.attributes.area} sq.m of area, ` +
      "this property offers a versatile investment opportunity. It's situated at the coordinates " +
      `${createPropertyBody.attributes.latitude}, ${createPropertyBody.attributes.longitude}.`
    );
  }

  private assembleIroProposal(financialsInput: FinancialsInputDto, fees) {
    return {
      ...this.getTokenPriceAndTotalSupply(financialsInput),
      duration: PropertyService.IRO_DURATION,
      opearationFee: this.getOperationFee(fees),
      treasuryFee: PropertyService.TREASURY_FEE_PERCENT.percentOf(financialsInput.assetPrice),
    };
  }

  private getTokenPriceAndTotalSupply(financialsInput: FinancialsInputDto) {
    if (!financialsInput.tokenPrice) {
      const tokenPrice = (financialsInput.assetPrice / financialsInput.tokenSupply).roundCeil(2);
      if (tokenPrice * financialsInput.tokenSupply !== financialsInput.assetPrice) {
        throw new HttpException(400, "assetPrice and tokenSupply division should have at most 2 decimals places");
      }
      return {
        tokenPrice: tokenPrice.toFixedCeil(2),
        tokenSupply: financialsInput.tokenSupply,
      };
    }

    if (financialsInput.tokenPrice.roundCeil(2) !== financialsInput.tokenPrice) {
      throw new HttpException(400, "tokenPrice should have at most 2 decimals places");
    }

    if (financialsInput.assetPrice % financialsInput.tokenPrice !== 0) {
      throw new HttpException(400, "assetPrice should be a multiple of tokenPrice");
    }

    const tokenSupply = financialsInput.assetPrice / financialsInput.tokenPrice;
    if (tokenSupply.roundCeil(2) !== tokenSupply) {
      throw new HttpException(400, "tokenSupply shoul be an integer");
    }

    return {
      tokenPrice: financialsInput.tokenPrice.toFixed(2),
      tokenSupply: tokenSupply.toFixed(2),
    };
  }

  private getAnnualCashflow(monthlyCashflow: number) {
    return (monthlyCashflow * 12).toFixedCeil(2); // 12 months cashflow
  }

  private calculateFeesFromAssetPrice(assetPrice: number) {
    return {
      /* closingCosts */
      transferTaxes: PropertyService.VACANCY_FEE_PERCENT.percentOf(assetPrice).toFixedCeil(2),
      vacancyReserves: PropertyService.VACANCY_FEE_PERCENT.percentOf(assetPrice).toFixedCeil(2),
      renovationReserves: PropertyService.RENOVATION_RESERVES_PERCENT.percentOf(assetPrice).toFixedCeil(2),
      tokenizationFees: PropertyService.TREASURY_FEE_PERCENT.percentOf(assetPrice).toFixedCeil(2),
      upfrontSpvFees: PropertyService.UPFRONT_SPV_FEES.toFixedCeil(2),
    };
  }

  private getOperationFee(fees) {
    return Object.values(fees).reduce((prev: string, next: string) => prev + next);
  }

  private populateSharesArray(shares: UserShare[], currencyDecimals: number | string) {
    const sharesArray = [];
    for (const share of shares) {
      sharesArray.push({
        address: share.address,
        committedFunds: this.adjustDecimals(share.committedFunds, currencyDecimals).toFixed(2),
        purchasedAmount: share.amount,
        iroShare: share.share,
        claimed: share.claimed,
      });
    }
    return sharesArray;
  }

  private adjustDecimals(amount: number | string, decimals: number | string): BigNumber {
    const denominator = new BigNumber("10").pow(new BigNumber(decimals));
    return new BigNumber(amount).div(denominator);
  }

  private formatAttributes(propertyAttributes: Attributes) {
    const nftAttributes = [];
    for (const attibute of Object.entries(propertyAttributes)) {
      nftAttributes.push({
        trait_type: this.formatTraitType(attibute[0]),
        value: attibute[0] !== "area" ? attibute[1].toString() : attibute[1].toString() + "sqm",
      });
    }
    return nftAttributes;
  }

  private getPropertyStatus(property: Property) {
    if (property.iroId === undefined) {
      return "DUE_DILIGENCE";
    }
    if (property.realEstateNftId === undefined) {
      return "FUNDING";
    }
    return "TRADE";
  }

  private formatTraitType(attributeName: string) {
    const capitalizedAttributeName = attributeName.charAt(0).toUpperCase() + attributeName.slice(1);
    return capitalizedAttributeName.split(/(?=[A-Z])/).join(" ");
  }
}

export default PropertyService;
