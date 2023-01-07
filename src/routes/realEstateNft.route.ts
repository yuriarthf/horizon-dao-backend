import { Router } from "express";
import RealEstateNftController from "@controllers/realEstateNft.controller";
//import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
//import authMiddleware from "@middlewares/auth.middleware";
//import validationMiddleware from "@middlewares/validation.middleware";
//import { toStringNoFail } from "@typegoose/typegoose/lib/internal/utils";

class RealEstateNftRoute implements Routes {
  public path = "/realEstateNft";
  public router = Router();
  public realEstateNftController = new RealEstateNftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}/:realEstateNftId`).get(this.realEstateNftController.getRealEstateNFt);
  }
}

export default RealEstateNftRoute;
