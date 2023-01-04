// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import propertyModel from "@models/property.model";
import iroModel from "@models/iro.model";

// Interfaces
import { Property, PropertyExtended } from "@interfaces/property.interface";
import { IROReduced, UserShare } from "@interfaces/iro.interface";
import { FilterQuery, PaginateOptions } from "mongoose";

// DTO
import { CreatePropertyDto } from "@dtos/property.dto";

// Utils
import { isEmpty } from "@utils/util";
import BigNumber from "bignumber.js";

// configure BigNumber constructor
BigNumber.config({ DECIMAL_PLACES: 2 });

// instantiate models
const iro = new iroModel();

interface GetPropertiesPaginatedResult {
  docs: PropertyExtended[];
  paginationMetadata: {
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page?: number | undefined;
    totalPages: number;
    offset: number;
    prevPage?: number | null | undefined;
    nextPage?: number | null | undefined;
    pagingCounter: number;
  };
}

class PropertyService {
  // TODO: Implement DTO for propertyBody
  public async createProperty(createPropertyBody: CreatePropertyDto) {
    if (isEmpty(createPropertyBody)) throw new HttpException(400, "propertyBody is empty");

    const findOne = await propertyModel.findOne({ name: createPropertyBody.name });
    if (findOne) throw new HttpException(409, "Property already exist (by name)");

    const createPropertyData = await propertyModel.create({status: "draft", ...createPropertyBody});

    return createPropertyData;
  }

  public async getPropertiesPaginated(
    filter: FilterQuery<Property>,
    options: PaginateOptions,
  ): Promise<GetPropertiesPaginatedResult> {
    const propertiesPagination = await propertyModel.paginate(filter, options);

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

    const iroIds: string[] = [];
    propertiesPagination.docs.forEach(doc => {
      if (doc.status === "crowdfunding") {
        iroIds.push(doc.iroId.toString());
      }
    });

    if (iroIds.length) {
      const iroQueryResult = await iro.getIros(iroIds);
      const iros: { [iroId: string]: IROReduced } = {};
      iroQueryResult.forEach(iro => {
        iros[iro.iroId] = iro;
      });

      propertiesPagination.docs.forEach((doc: any) => {
        const property: PropertyExtended = { ...(doc.toJSON()) };
        results.docs.push(property);
        if (doc.status === "crowdfunding") {
          const iro = iros[doc.iroId];
          property.iroStatus = iro.status;
          property.iroUnitPrice = this.adjustDecimals(
            iro.unitPrice, iro.currencyDecimals).toString();
          property.iroCurrency = iro.currency;
          property.iroSoftCap = this.adjustDecimals(
            iro.softCap, iro.currencyDecimals).toString();
          property.iroHardCap = this.adjustDecimals(
            iro.hardCap, iro.currencyDecimals).toString();
          property.iroStart = iro.start;
          property.iroEnd = iro.end;
          property.iroTotalFunding = this.adjustDecimals(
            iro.totalFunding, iro.currencyDecimals).toString();
        }
      });
    } else {
      results.docs = propertiesPagination.docs;
    }

    return results;
  }

  public async getPropertyById(propertyId: string): Promise<PropertyExtended> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");

    const property = (await propertyModel.findById(propertyId)).toJSON();
    if (!property) throw new HttpException(409, "Property doesn't exist");

    const result: PropertyExtended = { ...property };
    if (property.status === "crowdfunding") {
      const iroQueryResult = await iro.getIro(property.iroId.toString());
      result.iroStatus = iroQueryResult.status;
      result.iroUnitPrice = this.adjustDecimals(
        iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toString();
      result.iroCurrency = iroQueryResult.currency;
      result.iroSoftCap = this.adjustDecimals(
        iroQueryResult.softCap, iroQueryResult.currencyDecimals).toString();
      result.iroHardCap = this.adjustDecimals(
        iroQueryResult.hardCap, iroQueryResult.currencyDecimals).toString();
      result.iroStart = iroQueryResult.start;
      result.iroEnd = iroQueryResult.end;
      result.iroTotalFunding = this.adjustDecimals(
        iroQueryResult.totalFunding, iroQueryResult.currencyDecimals).toString();
      result.iroFundsWithdrawn = iroQueryResult.fundsWithdrawn;
      result.iroOwnerClaimed = iroQueryResult.ownerClaimed;
      result.iroReservesFee = iroQueryResult.reservesFee;
      result.iroTreasuryFee = iroQueryResult.treasuryFee;
      result.iroListingOwner = iroQueryResult.listingOwner;
      result.iroListingOwnerShare = iroQueryResult.listingOwnerShare;
      result.iroShares = this.populateSharesArray(iroQueryResult.shares, iroQueryResult.currencyDecimals);;
    }

    return result;
  }

  public async getPropertyByName(name: string): Promise<Property> {
    if (isEmpty(name)) throw new HttpException(400, "name is empty");

    const property = (await propertyModel.findOne({ name })).toJSON();
    if (!property) throw new HttpException(409, "Property doesn't exist");

    const result: PropertyExtended = { ...property };
    if (property.status === "crowdfunding") {
      const iroQueryResult = await iro.getIro(property.iroId.toString());
      result.iroStatus = iroQueryResult.status;
      result.iroUnitPrice = this.adjustDecimals(
        iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toString();
      result.iroCurrency = iroQueryResult.currency;
      result.iroSoftCap = this.adjustDecimals(
        iroQueryResult.softCap, iroQueryResult.currencyDecimals).toString();
      result.iroHardCap = this.adjustDecimals(
        iroQueryResult.hardCap, iroQueryResult.currencyDecimals).toString();
      result.iroStart = iroQueryResult.start;
      result.iroEnd = iroQueryResult.end;
      result.iroTotalFunding = this.adjustDecimals(
        iroQueryResult.totalFunding, iroQueryResult.currencyDecimals).toString();
      result.iroFundsWithdrawn = iroQueryResult.fundsWithdrawn;
      result.iroOwnerClaimed = iroQueryResult.ownerClaimed;
      result.iroReservesFee = iroQueryResult.reservesFee;
      result.iroTreasuryFee = iroQueryResult.treasuryFee;
      result.iroListingOwner = iroQueryResult.listingOwner;
      result.iroListingOwnerShare = iroQueryResult.listingOwnerShare;
      result.iroShares = this.populateSharesArray(iroQueryResult.shares, iroQueryResult.currencyDecimals);
    }

    return property;
  }

  // TODO: Implement some checks and DTO for updateBody param
  public async updatePropertyById(propertyId: string, updateBody): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(updateBody)) throw new HttpException(400, "updateBody is empty");
    const updatedProperty = propertyModel.findByIdAndUpdate(propertyId, updateBody);

    return updatedProperty;
  }

  public async setIroId(propertyId: string, iroId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(iroId)) throw new HttpException(400, "iroId is empty");
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, {
      iroId,
      status: "crowdfunding",
    });
    return updatedProperty;
  }

  public async setRealEstateNftId(propertyId: string, realEstateNftId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(realEstateNftId)) throw new HttpException(400, "realEstateNftId is empty");
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, {
      realEstateNftId,
      status: "trade",
    });
    return updatedProperty;
  }

  public async deletePropertyById(propertyId: string): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    const removedProperty = propertyModel.findByIdAndRemove(propertyId);
    return removedProperty;
  }

  private populateSharesArray(shares: UserShare[], currencyDecimals: number | string) {
    const sharesArray = [];
    for (let i = 0; i < shares.length; i++) {
      const share = shares[i];
      sharesArray.push({
        address: share.address,
        committedFunds: this.adjustDecimals(share.commitedFunds, currencyDecimals).toString(),
        purchasedAmount: share.amount,
        iroShare: share.share,
        claimed: share.claimed,
      });
    }
    return sharesArray;
  }

  private adjustDecimals(amount: number | string, decimals: number | string): BigNumber {
    const denominator = (new BigNumber("10").pow(new BigNumber(decimals)));
    return (new BigNumber(amount)).div(denominator);
  }
}

export default PropertyService;
