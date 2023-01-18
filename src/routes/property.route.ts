import { Router } from "express";
import PropertyController from "@controllers/property.controller";
import { Routes } from "@interfaces/routes.interface";
class PropertyRoute implements Routes {
  public path = "/property";
  public router = Router();
  public propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}/add`).post(/*authMiddleware, */ this.propertyController.addProperty);
    this.router.route(`${this.path}/delete/:propertyId`).delete(this.propertyController.deleteProperty);
    this.router.route(`${this.path}/:page`).get(this.propertyController.getProperties);
    this.router.route(`${this.path}/:propertyId`).get(this.propertyController.getProperty);
    this.router
      .route(`${this.path}/update/:propertyId`)
      .patch(/*authMiddleware, */ this.propertyController.updateProperty);
    this.router.route(`${this.path}/startIro/:propertyId`).patch(/*authMiddleware, */ this.propertyController.startIRO);
    this.router
      .route(`${this.path}/reportRealEstateNft`)
      .patch(/*authMiddleware, */ this.propertyController.reportRealEstateNFT);
  }
}

export default PropertyRoute;
