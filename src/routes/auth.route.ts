import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware from "@middlewares/auth.middleware";
import validationMiddleware from "@middlewares/validation.middleware";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log("init login routes");
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, "body"), this.authController.signUp);
    this.router.post(`${this.path}wallet-nonce`, this.authController.walletNonce);
    this.router.post(`${this.path}verify-wallet`, this.authController.verifyWallet);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
