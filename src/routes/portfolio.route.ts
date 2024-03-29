import { Router } from "express";
import PropertyController from "@controllers/property.controller";
import { Routes } from "@interfaces/routes.interface";

class PortfolioRoute implements Routes {
  public path = "/portfolio";
  public router = Router();
  public propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/iro/:userAddress`)
      .get(this.propertyController.getUserFundings);
    this.router
      .route(`${this.path}/realEstate/:userAddress`)
      .get(this.propertyController.getUserProperties);
    this.router
      .route(`${this.path}/history/:userAddress`)
      .get(this.propertyController.getUserHistory);
  }
}

export default PortfolioRoute;
