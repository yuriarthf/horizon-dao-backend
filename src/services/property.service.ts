// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import propertyModel from "@models/property.model";
import RealEstateNFTModel from "@models/realEstateNft.model";
import iroModel from "@models/iro.model";
import realEstateAccountModel from "@models/realEstateAccount.model";

// Interfaces
import { Property, PropertyExtended, GetPropertiesPaginatedResult, Attributes } from "@interfaces/property.interface";
import { IROReduced, UserShare } from "@interfaces/iro.interface";
import { FilterQuery, PaginateOptions } from "mongoose";

// DTO
import { CreatePropertyDto, FinancialsInputDto } from "@dtos/property.dto";

// Utils
import { isEmpty } from "@utils/util";
import BigNumber from "bignumber.js";

// Type extensions
import "./type-extensions/number.extensions";
import "./type-extensions/string.extensions";

// configure BigNumber constructor
BigNumber.config({ DECIMAL_PLACES: 2 });

// instantiate models
const iro = new iroModel();
const realEstateAccount = new realEstateAccountModel();

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

  public async createProperty(createPropertyBody: CreatePropertyDto) {
    if (isEmpty(createPropertyBody)) throw new HttpException(400, "createPropertyBody is empty");

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

  public async getPropertiesPaginated(
    filter: FilterQuery<Property>,
    options: PaginateOptions,
  ): Promise<GetPropertiesPaginatedResult> {
    const iros: { [iroId: string]: IROReduced } = {};
    if (filter?.status && filter?.status !== "TRADE") {
      const iroQueryResult = await iro.getIrosByStatus(this.getSubgraphIroStatusFilter(filter));
      iroQueryResult.forEach((iro: any) => {
        iros[iro.iroId] = iro;
      });
      filter.iroIds = Object.keys(iros).map(id => parseInt(id));
    }

    const propertiesPagination = await propertyModel.paginate(this.formatQuery(filter), options);

    if (!filter?.status) {
      const iroIds: string[] = [];
      const iroQueryResult = await iro.getIrosById(iroIds);
      iroQueryResult.forEach(iro => {
        iros[iro.iroId] = iro;
      });
    }

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
          propertyIro.status = iro.status;
          iro.status !== "ONGOING" && (property.status = iro.status);
          propertyIro.tokenPrice = this.adjustDecimals(iro.unitPrice, iro.currencyDecimals).toString();
          propertyIro.currency = iro.currency;
          propertyIro.softCap = this.adjustDecimals(iro.softCap, iro.currencyDecimals).toString();
          propertyIro.hardCap = this.adjustDecimals(iro.hardCap, iro.currencyDecimals).toString();
          propertyIro.start = iro.start;
          propertyIro.end = iro.end;
          propertyIro.totalFunding = this.adjustDecimals(iro.totalFunding, iro.currencyDecimals).toString();
          property.iro = propertyIro;
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
      resultIro.status = iroQueryResult.status;
      iroQueryResult.status !== "ONGOING" && (result.status = iroQueryResult.status);
      resultIro.tokenPrice = this.adjustDecimals(iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toFixed(2);
      resultIro.currency = iroQueryResult.currency;
      resultIro.softCap = this.adjustDecimals(iroQueryResult.softCap, iroQueryResult.currencyDecimals).toFixed(2);
      resultIro.hardCap = this.adjustDecimals(iroQueryResult.hardCap, iroQueryResult.currencyDecimals).toFixed(2);
      resultIro.start = iroQueryResult.start;
      resultIro.end = iroQueryResult.end;
      resultIro.totalFunding = this.adjustDecimals(
        iroQueryResult.totalFunding,
        iroQueryResult.currencyDecimals,
      ).toFixed(2);
      resultIro.fundsWithdrawn = iroQueryResult.fundsWithdrawn;
      resultIro.ownerClaimed = iroQueryResult.ownerClaimed;
      resultIro.reservesFee = iroQueryResult.reservesFee;
      resultIro.treasuryFee = iroQueryResult.treasuryFee;
      resultIro.listingOwner = iroQueryResult.listingOwner;
      resultIro.listingOwnerShare = iroQueryResult.listingOwnerShare;
      resultIro.shares = this.populateSharesArray(iroQueryResult.shares, iroQueryResult.currencyDecimals);
      result.iro = resultIro;
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
      const currencyDecimals = userShare.iro.currencyDecimals;
      results.push({
        _id: property._id,
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
          tokenPrice: this.adjustDecimals(userShare.iro.unitPrice, currencyDecimals),
          softCap: this.adjustDecimals(userShare.iro.softCap, currencyDecimals),
          hardCap: this.adjustDecimals(userShare.iro.hardCap, currencyDecimals),
          start: userShare.iro.start,
          end: userShare.iro.end,
          totalFunding: this.adjustDecimals(userShare.iro.totalFunding, currencyDecimals),
          currentSupply: new BigNumber(userShare.iro.totalFunding).div(new BigNumber(userShare.iro.unitPrice)),
        },
      });
    }

    return results;
  }

  public async getUserProperties(user: string) {
    if (isEmpty(user)) throw new HttpException(404, "Invalid user");

    const userAccounts = await realEstateAccount.getRealEstateAccounts(user);

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
      iroQueryResult.status !== "ONGOING" && (result.status = iroQueryResult.status);
      result.iro.tokenPrice = this.adjustDecimals(iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toString();
      result.iro.currency = iroQueryResult.currency;
      result.iro.softCap = this.adjustDecimals(iroQueryResult.softCap, iroQueryResult.currencyDecimals).toString();
      result.iro.hardCap = this.adjustDecimals(iroQueryResult.hardCap, iroQueryResult.currencyDecimals).toString();
      result.iro.start = iroQueryResult.start;
      result.iro.end = iroQueryResult.end;
      result.iro.totalFunding = this.adjustDecimals(
        iroQueryResult.totalFunding,
        iroQueryResult.currencyDecimals,
      ).toString();
      result.iro.fundsWithdrawn = iroQueryResult.fundsWithdrawn;
      result.iro.ownerClaimed = iroQueryResult.ownerClaimed;
      result.iro.reservesFee = iroQueryResult.reservesFee;
      result.iro.treasuryFee = iroQueryResult.treasuryFee;
      result.iro.listingOwner = iroQueryResult.listingOwner;
      result.iro.listingOwnerShare = iroQueryResult.listingOwnerShare;
      result.iro.shares = this.populateSharesArray(iroQueryResult.shares, iroQueryResult.currencyDecimals);
    }

    return property;
  }

  // TODO: Implement some checks and DTO for updateBody param
  public async updatePropertyById(propertyId: string, updateBody): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(updateBody)) throw new HttpException(400, "updateBody is empty");
    updateBody.updatedAt = Date.now();
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
    if (!filter.status || filter.status === "IRO") return ["ONGOING", /* "SUCCESS", */ "FAIL"];
    return [filter.status];
  }

  private formatQuery(filter: any) {
    const query: any[] = [];
    filter.iroIds && filter.iroIds.length > 0 && query.push({ iroId: { $in: filter.iroIds } });
    filter.status &&
      query.push(
        (() => {
          if (filter.status === "DUE_DILLIGENCE") return { iroId: { $exists: false } };
          if (filter.status === "IRO") return { iroId: { $exists: true }, realEstateNftId: { $exists: false } };
          if (filter.status === "TRADE") return { iroId: { $exists: true }, realEstateNftId: { $exists: true } };
          throw new HttpException(500, "Invalid status filter value");
        })(),
      );
    filter.type && query.push({ type: filter.type });
    filter.country && query.push({ country: filter.country });
    filter.city && query.push({ city: filter.city });
    filter.tokenPrice &&
      query.push({
        tokenPrice: {
          $and: [{ $gte: filter.tokenPrice.min }, { $lte: filter.tokenPrice.max }],
        },
      });
    filter.priceRange &&
      query.push({
        priceRange: {
          $and: [{ $gte: filter.priceRange.min }, { $lte: filter.priceRange.max }],
        },
      });
    filter.totalSupply &&
      query.push({
        iroProposal: {
          tokenSupply: { $and: [{ $gte: filter.totalSupply.min }, { $lte: filter.totalSupply.max }] },
        },
      });

    filter.area &&
      query.push({
        attributes: {
          area: {
            $and: [{ $gte: filter.area.min }, { $lte: filter.area.max }],
          },
        },
      });

    filter.bedrooms &&
      query.push({
        attributes: {
          bedrooms: {
            $and: [{ $gte: filter.bedrooms.min }, { $lte: filter.bedrooms.max }],
          },
        },
      });

    return query.length > 0 ? { $and: query } : {};
  }

  private createPropertyBodyToPropertyStorage(createPropertyBody: CreatePropertyDto) {
    const fees = this.calculateFeesFromAssetPrice(createPropertyBody.financialInput.assetPrice);
    const totalInvestmentValue = this.assembleTotalInvestmentValue(createPropertyBody.financialInput, fees);
    const annualGrossRents = this.assembleAnnualGrossRents(createPropertyBody.financialInput);
    const totalReturns = this.assembleTotalReturns(annualGrossRents.annualCashflow, totalInvestmentValue.total);
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
        totalInvestmentValue,
        totalReturns,
        annualGrossRents,
      },
    };
  }

  private assembleAnnualGrossRents(financialsInput: FinancialsInputDto) {
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

  private assembleTotalReturns(annualCashflow: string, totalInvestmentValue: string) {
    const totalReturns: any = {
      /* projectedAppreciationPercentage */
      cashOnCashReturnPercentage: annualCashflow.mul("100").div(totalInvestmentValue).numberToFixed(2),
    };
    totalReturns.totalPercentage = Object.values(totalReturns).reduce((prev: string, next: string): string =>
      prev.add(next),
    );
    return totalReturns;
  }

  private assembleTotalInvestmentValue(financialsInput: FinancialsInputDto, fees) {
    const totalInvestmentValue: { [field: string]: string } = {
      assetPrice: financialsInput.assetPrice.toFixedCeil(2),
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
      reservesFee: this.getReservesFee(fees),
      treasuryFee: PropertyService.TREASURY_FEE_PERCENT,
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

  private getReservesFee(fees) {
    return Object.values(fees).reduce((prev: string, next: string) => prev + next);
  }

  private populateSharesArray(shares: UserShare[], currencyDecimals: number | string) {
    const sharesArray = [];
    for (let i = 0; i < shares.length; i++) {
      const share = shares[i];
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
