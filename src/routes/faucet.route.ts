import { Router } from "express";
import FaucetController from "@controllers/faucet.controller";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware from "@middlewares/auth.middleware";

class FaucetRoute implements Routes {
    public path = "/faucet";
    public router = Router();
    public faucetController = new FaucetController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/requestTestTokens`, authMiddleware, this.faucetController.requestTestTokens);
    }
}

export default FaucetRoute;