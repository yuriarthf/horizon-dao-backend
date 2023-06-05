import { NextFunction, Response } from "express";
import { RequestWithUser } from "@interfaces/auth.interface";
import FaucetService from "@services/faucet.service";

class FaucetController {
    public faucetService = new FaucetService();

    public requestTestTokens = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const faucetConfirmation = await this.faucetService.requestTestTokens(req.user);
            res.status(200).json({ data: faucetConfirmation, message: "Platform testnet stablecoins sent" });
        } catch (error) {
            next(error);
        }
    };
}

export default FaucetController;