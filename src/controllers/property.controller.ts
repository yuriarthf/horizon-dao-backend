import { NextFunction, Request, Response } from "express";
//import { CreateUserDto } from "@dtos/users.dto";
//import { Property } from "@interfaces/property.interface";
import propertyService from "@services/property.service";
import { pick } from "@utils/util";

class PropertyController {
  public propertyService = new propertyService();

  public addProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProperty = await this.propertyService.createProperty(req.body);
      res.status(201).json({ data: newProperty, message: "Property created" });
    } catch (error) {
      next(error);
    }
  };

  public deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedProperty = await this.propertyService.deleteProperty(req.params.propertyId);
      res.status(201).json({ data: deletedProperty, message: "Property deleted" });
    } catch (error) {
      next(error);
    }
  };

  public getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.body, [
        "status",
        "type",
        "country",
        "city",
        "tokenPrice",
        "priceRange",
        "totalSupply",
        "apy",
        "area",
        "bedrooms",
      ]);
      const options = pick(req.params, ["page"]);
      Object.assign(options, pick(req.query, ["sort", "limit", "offset"]));
      const getAllUsersResult = await this.propertyService.getPropertiesPaginated(filter, options);
      res.status(200).json({ data: getAllUsersResult });
    } catch (error) {
      next(error);
    }
  };

  public getUserFundings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userFundings = await this.propertyService.getUserFundings(req.params.userAddress);
      res.status(200).json({ data: userFundings });
    } catch (error) {
      next(error);
    }
  };

  public getUserProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProperties = await this.propertyService.getUserProperties(req.params.userAddress);
      res.status(200).json({ data: userProperties });
    } catch (error) {
      next(error);
    }
  };

  public getProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await this.propertyService.getPropertyById(req.params.propertyId);
      res.status(200).json({ data: property });
    } catch (error) {
      next(error);
    }
  };

  public updateProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedProperty = await this.propertyService.updatePropertyById(req.params.propertyId, req.body);
      res.status(200).json({ data: updatedProperty, message: "Property updated" });
    } catch (error) {
      next(error);
    }
  };

  public startIRO = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedProperty = await this.propertyService.setIroId(req.params.propertyId, req.body.iroId);
      res.status(200).json({ data: updatedProperty, message: "IRO started" });
    } catch (error) {
      next(error);
    }
  };

  public reportRealEstateNFT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedProperty = await this.propertyService.setRealEstateNftId(req.body.iroId, req.body.realEstateNftId);
      res.status(200).json({ data: updatedProperty, message: "RealEstateNFT created" });
    } catch (error) {
      next(error);
    }
  };
}

export default PropertyController;
