import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "@interfaces/auth.interface";
import PropertyService from "@services/property.service";
import { pick } from "@utils/util";

const FILTER_KEYS = [
  "status",
  "type",
  "country",
  "city",
  "region",
  "tokenSupply",
  "area",
  "bedrooms",
  "bathrooms",
  "yearBuilt",
  "parking",
  "latitude",
  "longitude"
];

class PropertyController {
  public propertyService = new PropertyService();

  public addProperty = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const newProperty = await this.propertyService.createProperty(req.body, req.user);
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

  public getPropertyFilters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyFilters = await this.propertyService.getPropertyFieldValues(FILTER_KEYS);
      res.status(200).json({ data: propertyFilters });
    } catch (error) {
      next(error);
    }
  }

  public getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.body, FILTER_KEYS);
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
