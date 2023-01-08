// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import propertyModel from "@models/property.model";
import RealEstateNFTModel from "@models/realEstateNft.model";
import iroModel from "@models/iro.model";

// Interfaces
import { Property, PropertyExtended, GetPropertiesPaginatedResult, Attributes } from "@interfaces/property.interface";
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

class PropertyService {
  public async createProperty(createPropertyBody: CreatePropertyDto) {
    if (isEmpty(createPropertyBody)) throw new HttpException(400, "createPropertyBody is empty");

    const findOne = await propertyModel.findOne({ name: createPropertyBody.name });
    if (findOne) throw new HttpException(409, "Property already exist (by name)");

    const createPropertyData = await propertyModel.create(createPropertyBody);

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
      if (doc.iroId && !doc.realEstateNftId) {
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
        const property: PropertyExtended = { ...doc.toJSON() };
        results.docs.push(property);
        if (doc.iroId && !doc.realEstateNftId) {
          const iro = iros[doc.iroId];
          property.iro.status = iro.status;
          property.iro.unitPrice = this.adjustDecimals(iro.unitPrice, iro.currencyDecimals).toString();
          property.iro.currency = iro.currency;
          property.iro.softCap = this.adjustDecimals(iro.softCap, iro.currencyDecimals).toString();
          property.iro.hardCap = this.adjustDecimals(iro.hardCap, iro.currencyDecimals).toString();
          property.iro.start = iro.start;
          property.iro.end = iro.end;
          property.iro.totalFunding = this.adjustDecimals(iro.totalFunding, iro.currencyDecimals).toString();
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
    if (property.iroId && !property.realEstateNftId) {
      const iroQueryResult = await iro.getIro(property.iroId.toString());
      result.iro.status = iroQueryResult.status;
      result.iro.unitPrice = this.adjustDecimals(iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toString();
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

    return result;
  }

  public async getPropertyByName(name: string): Promise<Property> {
    if (isEmpty(name)) throw new HttpException(400, "name is empty");

    const property = (await propertyModel.findOne({ name })).toJSON();
    if (!property) throw new HttpException(409, "Property doesn't exist");

    const result: PropertyExtended = { ...property };
    if (property.iroId && !property.realEstateNftId) {
      const iroQueryResult = await iro.getIro(property.iroId.toString());
      result.iro.status = iroQueryResult.status;
      result.iro.unitPrice = this.adjustDecimals(iroQueryResult.unitPrice, iroQueryResult.currencyDecimals).toString();
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
    const updatedProperty = propertyModel.findByIdAndUpdate(propertyId, updateBody);

    return updatedProperty;
  }

  public async setIroId(propertyId: string, iroId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(iroId)) throw new HttpException(400, "iroId is empty");
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, {
      iroId,
    });
    return updatedProperty;
  }

  public async setRealEstateNftId(propertyId: string, realEstateNftId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(realEstateNftId)) throw new HttpException(400, "realEstateNftId is empty");

    const property = await propertyModel.findById(propertyId);
    if (!property) throw new HttpException(409, "Property doesn't exist");

    if (property.realEstateNftId) throw new HttpException(400, "Real Estate NFT ID already set");

    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, {
      realEstateNftId,
    });

    const realEstateNft = await RealEstateNFTModel.create({
      _id: realEstateNftId,
      name: updatedProperty.name,
      description: updatedProperty.description,
      image: updatedProperty.imageUrl,
      attributes: this.formatAttributes(updatedProperty.attributes),
      external_url: `horizon-dao.io/asset/${propertyId}`,
    });
    return realEstateNft;
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
    const denominator = new BigNumber("10").pow(new BigNumber(decimals));
    return new BigNumber(amount).div(denominator);
  }

  private formatAttributes(propertyAttributes: Attributes) {
    const nftAttributes = [];
    for (const attibute of Object.entries(propertyAttributes)) {
      nftAttributes.push({
        trait_type: attibute[0],
        value: attibute[1].toString(),
      });
    }
    return nftAttributes;
  }
}

export default PropertyService;
