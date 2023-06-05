import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware from "@middlewares/auth.middleware";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}walletNonce`, this.authController.walletNonce);
    this.router.post(`${this.path}signUp`, this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.login);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logout);
  }
}

export default AuthRoute;
