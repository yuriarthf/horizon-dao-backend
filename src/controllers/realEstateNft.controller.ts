import { NextFunction, Request, Response } from "express";
import realEstateNftService from "@services/realEstateNft.service";

class RealEstateNftController {
  public realEstateNftService = new realEstateNftService();

  public getRealEstateNFt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const realEstateNft = await this.realEstateNftService.getRealEstateNftById(req.params.realEstateNftId);
      res.status(200).json({ data: realEstateNft });
    } catch (error) {
      next(error);
    }
  };
}

export default RealEstateNftController;
