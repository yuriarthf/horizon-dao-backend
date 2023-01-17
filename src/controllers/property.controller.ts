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

  public getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.body, [
        "status",
        "type",
        "country",
        "city",
        "tokenPriceMin",
        "tokenPriceMax",
        "assetValueMin",
        "assetValueMax",
        "totalSupplyMin",
        "totalSupplyMax",
        "aprMin",
        "aprMax",
        "sizeMin",
        "sizeMax",
        "bedroomMin",
        "bedroomMax",
        "bathroomMin",
        "bathroomMax",
      ]);
      const options = pick(req.params, ["page"]);
      Object.assign(options, pick(req.query, ["sort", "limit", "offset"]));
      const getAllUsersResult = await this.propertyService.getPropertiesPaginated(filter, options);
      res.status(200).json({ data: getAllUsersResult });
    } catch (error) {
      next(error);
    }
  };

  public getUserIROProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIROProperties = await this.propertyService.getUserIROProperties(req.params.userAddress);
      res.status(200).json({ data: userIROProperties });
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
