// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import propertyModel from "@models/property.model";
import iroModel from "@models/iro.model";

// Interfaces
import { Property, PropertyExtended } from "@interfaces/property.interface";
import { IROReduced } from "@interfaces/iro.interface";
import { FilterQuery, PaginateOptions } from 'mongoose';

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
  docs: PropertyExtended[]
  metadata: {
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
  }
}

class PropertyService {
  // TODO: Implement DTO for propertyBody
  public async createProperty(createPropertyBody: CreatePropertyDto) {
    if (isEmpty(createPropertyBody)) throw new HttpException(400, "propertyBody is empty");

    const findOne = await propertyModel.findOne({name: createPropertyBody.name });
    if (findOne) throw new HttpException(409, "Property already exist (by name)");

    const createPropertyData = await propertyModel.create(createPropertyBody);

    return createPropertyData;
  }

  public async getPropertiesPaginated(filter: FilterQuery<Property>, options: PaginateOptions): Promise<GetPropertiesPaginatedResult> {
    const propertiesPagination = await propertyModel.paginate(filter, options);

    const iroIds: string[] = [];
    propertiesPagination.docs.forEach(doc => {
      if (doc.status === "crowdfunding") {
        iroIds.push(doc.iroId.toString());
      }
    });

    const results: GetPropertiesPaginatedResult = {
      metadata: {
        totalDocs: propertiesPagination.totalDocs,
        limit: propertiesPagination.limit,
        hasPrevPage: propertiesPagination.hasPrevPage,
        hasNextPage: propertiesPagination.hasNextPage,
        page: propertiesPagination.page, 
        totalPages: propertiesPagination.totalPages,
        offset: propertiesPagination.offset,
        prevPage: propertiesPagination.prevPage,
        nextPage: propertiesPagination.nextPage, 
        pagingCounter: propertiesPagination.pagingCounter
      },
      docs: []
    };
    const iroQueryResult = await iro.getIros(iroIds);
    const iros: {[iroId: string]: IROReduced } = {};
    iroQueryResult.iros.forEach(iro => {
      iros[iro.iroId] = iro;
    });

    propertiesPagination.docs.forEach(doc => {
      const property: PropertyExtended = {...doc};
      results.docs.push(property);
      if (doc.status === "crowdfunding") {
        const iro = iros[doc.iroId];
        const denominator = new BigNumber(iro.currencyDecimals);
        property.iroStatus = iro.status;
        property.iroUnitPrice = (new BigNumber(iro.unitPrice))
          .div(denominator).toString();
        property.iroCurrency = iro.currency;
        property.iroSoftCap = (new BigNumber(iro.softCap))
          .div(denominator).toString();
        property.iroHardCap = (new BigNumber(iro.hardCap))
          .div(denominator).toString();
        property.iroStart = iro.start;
        property.iroEnd = iro.end;
      }
    });

    return results;
  }

  public async getPropertyById(propertyId: string): Promise<PropertyExtended> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");

    const property = await propertyModel.findById(propertyId);
    if (!property) throw new HttpException(409, "Property doesn't exist");

    const result: PropertyExtended = {...property};
    if (property.status === "crowdfunding") {
      const iroQueryResult = (await iro.getIros([property.iroId.toString()]))
        .iros[0];
      const denominator = new BigNumber(iroQueryResult.currencyDecimals);
      result.iroStatus = iroQueryResult.status;
      result.iroUnitPrice = (new BigNumber(iroQueryResult.unitPrice))
        .div(denominator).toString();
      result.iroCurrency = iroQueryResult.currency;
      result.iroSoftCap = (new BigNumber(iroQueryResult.softCap))
        .div(denominator).toString();
      result.iroHardCap = (new BigNumber(iroQueryResult.hardCap))
        .div(denominator).toString();
      result.iroStart = iroQueryResult.start;
      result.iroEnd = iroQueryResult.end;
    }

    return result;
  }

  public async getPropertyByName(name: string): Promise<Property> {
    if (isEmpty(name)) throw new HttpException(400, "name is empty");

    const property = await propertyModel.findOne({ name });
    if (!property) throw new HttpException(409, "Property doesn't exist");

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
      stage: "crowdfunding"
    });
    return updatedProperty;
  }

  public async setRealEstateNftId(propertyId: string, realEstateNftId: string) {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    if (isEmpty(realEstateNftId)) throw new HttpException(400, "realEstateNftId is empty");
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, { 
      realEstateNftId,
      stage: "trade"
    });
    return updatedProperty;
  }

  public async deletePropertyById(propertyId: string): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");
    const removedProperty = propertyModel.findByIdAndRemove(propertyId);
    return removedProperty;
  }
}

export default PropertyService;
