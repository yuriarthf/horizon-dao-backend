import { Router } from "express";
import PropertyDraftController from "@/controllers/propertyDraft.controller";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware from "@/middlewares/auth.middleware";

class PropertyDraftRoute implements Routes {
  public path = "/propertyDraft";
  public router = Router();
  public propertyDraftController = new PropertyDraftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}/retrieve`).get(authMiddleware, this.propertyDraftController.retrieveDraft);
    this.router.route(`${this.path}/save`).post(authMiddleware, this.propertyDraftController.saveDraft);
  }
}

export default PropertyDraftRoute;
