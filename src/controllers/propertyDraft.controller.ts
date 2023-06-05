import { NextFunction, Response } from "express";
import PropertyDraftService from "@services/propertyDraft.service";
import { RequestWithUser } from "@/interfaces/auth.interface";

class PropertyController {
  public propertyDraftService = new PropertyDraftService();

  public retrieveDraft = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const propertyDraft = await this.propertyDraftService.retrieveDraft(req.user);
      res.status(201).json({ data: propertyDraft });
    } catch (error) {
      next(error);
    }
  }

  public saveDraft = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const propertyDraft = await this.propertyDraftService.saveDraft(req.body, req.user);
      res.status(201).json({ data: propertyDraft, message: "Draft saved" });
    } catch (error) {
      next(error);
    }
  };
}

export default PropertyController;
