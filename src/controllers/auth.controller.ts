import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/users.dto";
import { RequestWithUser } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import AuthService from "@services/auth.service";

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      findUser.password = undefined;
      findUser.nonce = undefined;
      delete findUser.password;

      res.setHeader("Set-Cookie", [cookie]);

      res.status(200).json({ data: findUser, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };

  public generateNonce = () => {
    return Math.random();
  };

  public walletNonce = async (req: RequestWithUser, res: Response) => {
    const address = req.query.address;
    const user = await this.authService.walletNonce(address);
    res.status(201).json({ data: user, message: "Wallet nonce created successfully" });
  };

  public toHex = (stringToConvert: string) => {
    return stringToConvert
      .split("")
      .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  };

  public verifyWallet = async (req, res) => {
    const address = req.query.address;
    const signature = req.query.signature;

    const { cookie, userUpdated } = await this.authService.verifyWallet(address, signature);

    res.setHeader("Set-Cookie", [cookie]);
    res.status(201).json({ data: userUpdated, message: "Wallet verified successfully" });
  };
}

export default AuthController;
