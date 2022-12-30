import { HttpException } from "@exceptions/HttpException";
import { Property } from "@interfaces/property.interface";
import { IPaginateResult } from "typegoose-cursor-pagination";
import propertyModel from "@models/property.model";
import { isEmpty, parseOptions } from "@utils/util";
import type { Options } from "@utils/types";

class PropertyService {
  // TODO: Implement DTO for propertyBody
  public async createProperty(propertyBody): Promise<Property> {
    if (isEmpty(propertyBody)) throw new HttpException(400, "propertyBody is empty");

    return await propertyModel.create(propertyBody);
  }

  // TODO: Translate filter to mongoDB format
  public async getPropertiesPaginated(filter, options: Options): Promise<IPaginateResult<Property>> {
    const propertiesPagination = await propertyModel.findPaged(parseOptions(options));
    return propertiesPagination as IPaginateResult<Property>;
  }

  public async getPropertyById(propertyId: string): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, "propertyId is empty");

    const property = await propertyModel.findById(propertyId);
    if (!property) throw new HttpException(409, "Property doesn't exist");

    return property;
  }

  public async getPropertyByName(name: string): Promise<Property> {
    if (isEmpty(name)) throw new HttpException(400, "name is empty");

    const property = await propertyModel.findOne({ name });
    if (!property) throw new HttpException(409, "Property doesn't exist");

    return property;
  }

  // TODO: Implement some checks and DTO for updateBody param
  public async updatePropertyById(propertyId: string, updateBody): Promise<Property> {
    const updatedProperty = propertyModel.findByIdAndUpdate(propertyId, updateBody);

    return updatedProperty;
  }

  public async setIroId(propertyId: string, iroId: string) {
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, { 
      iroId,
      stage: "crowdfunding"
    });
    return updatedProperty;
  }

  public async setRealEstateNftId(propertyId: string, realEstateNftId: string) {
    const updatedProperty = await propertyModel.findByIdAndUpdate(propertyId, { 
      realEstateNftId,
      stage: "trade"
    });
    return updatedProperty;
  }

  public async deletePropertyById(propertyId: string): Promise<Property> {
    const removedProperty = propertyModel.findByIdAndRemove(propertyId);
    return removedProperty;
  }
}

export default PropertyService;
