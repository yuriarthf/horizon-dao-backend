import { NextFunction, Request, Response } from "express";
import { LogInDto, SignUpDto } from "@dtos/auth.dto";
import AuthService from "@services/auth.service";
import { RequestWithUser } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";

class AuthController {
  public authService = new AuthService();

  public walletNonce = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nonce = await this.authService.walletNonce(req.query.address as string);
      res.status(201).json({ data: { nonce }, message: "Current wallet nonce" });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: SignUpDto = req.body;
      const newUser = await this.authService.signUp(userData);

      res.status(201).json({ data: newUser, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logInUserData: LogInDto = req.body;
      const user = await this.authService.login(logInUserData);

      res.status(200).json({ data: user, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const user: User = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: user, message: "logout" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
