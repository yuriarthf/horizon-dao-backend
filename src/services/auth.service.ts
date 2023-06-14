// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Interfaces
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";

// DTO
import { LogInDto, SignUpDto } from "@dtos/auth.dto";

// Utils
import { isEmpty } from "@utils/util";
import { ethers } from "ethers";
import { sign } from "jsonwebtoken";

// Models
import userModel from "@models/users.model";

// Config
import { SECRET_KEY } from "@config";

class AuthenticationService {
  static NONCE_RANGE = 10000;
  static JWT_EXPIRATION_TIME = 60 * 60;

  // messages
  static SIGNUP_MESSAGE =
    "Please sign this message to confirm you're the owner of the wallet and signup to our service";
  static LOGIN_TYPEHASH = ethers.keccak256("LoginMessage(string message, uint256 nonce)");
  static LOGIN_DOMAIN = { name: "LoginMessage", chainId: 80001 };
  static LoginMessage = [
    { name: "message", type: "string" },
    { name: "nonce", type: "uint256" }
  ];
  static LOGIN_MESSAGE_TEXT =
    "Please sign this message to confirm and verify your wallet address to login into our service.";

  public async signUp(signUpBody: SignUpDto) {
    if (isEmpty(signUpBody)) throw new HttpException(400, "signUpBody is empty");

    const { signingAddress, user } = await AuthenticationService.authenticate(
      signUpBody.signature,
      undefined,
      AuthenticationService.SIGNUP_MESSAGE,
      false,
    );

    if (user) {
      throw new HttpException(409, "User already exists");
    }

    const nonce = AuthenticationService.generateNonce();

    const newUser = await userModel.create({ address: signingAddress, nonce }) as any;

    const tokenData = AuthenticationService.createToken(newUser);

    return { tokenData, user: newUser };
  }

  public async walletNonce(address: string) {
    if (isEmpty(address)) throw new HttpException(400, "address is empty");

    const findOne = await userModel.findOne({ address });
    if (!findOne) throw new HttpException(409, "User doesn't exist");

    return findOne.nonce;
  }

  public async login(logInData: LogInDto) {
    const { user } = await AuthenticationService.authenticate(
      logInData.signature,
      logInData.nonce,
      AuthenticationService.LOGIN_MESSAGE_TEXT,
      true,
    );

    const tokenData = AuthenticationService.createToken(user);
    return { tokenData, user };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await userModel.findById(userData._id);
    delete findUser.nonce;

    if (!findUser) throw new HttpException(409, `This address ${userData.address} was not found`);

    return findUser;
  }

  static createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = AuthenticationService.JWT_EXPIRATION_TIME;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  static async authenticate(
    signature: string,
    nonce?: number,
    message: string = AuthenticationService.LOGIN_MESSAGE_TEXT,
    updateNonce: boolean = true,
  ) {
    const { valid, signingAddress, user } = await AuthenticationService.verifySignature(
      message,
      signature,
      nonce
    );

    if (!valid && nonce) {
      throw new HttpException(401, "Invalid signature");
    }

    if (updateNonce) {
      AuthenticationService.generateNonce();
      await AuthenticationService.updateNonce(signingAddress, nonce);
    }

    return {
      signingAddress,
      user,
    };
  }

  static retrieveAddressFromSignature(message: string, signature: string, nonce?: number) {
    if (typeof nonce === "number") {
      return ethers.verifyTypedData(
        AuthenticationService.LOGIN_DOMAIN,
        {
          LoginMessage: AuthenticationService.LoginMessage
        },
        { message, nonce },
        signature
      );
    }

    return ethers.verifyMessage(AuthenticationService.hashEip191(message), signature);
  }

  static async verifySignature(
    message: string,
    signature: string,
    nonce?: number,
  ): Promise<{ valid: boolean; signingAddress: string; user?: User; }> {
    const signingAddress = AuthenticationService.retrieveAddressFromSignature(message, signature, nonce);

    const user = await userModel.findOne({ address: signingAddress }) as User;
    if (nonce) {
      if (!user) throw new HttpException(409, "User not registered");
      if (user.nonce !== nonce) throw new HttpException(401, "Nonce doesn't match");
    }

    return {
      valid: true,
      signingAddress,
      user,
    };
  }

  static hashEip191(message: string) {
    return ethers.toUtf8Bytes(message);
  }

  static async updateNonce(address: string, nonce: number): Promise<number> {
    await userModel.findOneAndUpdate(
      { address },
      {
        nonce,
      },
      { new: true },
    );
    return nonce;
  }

  static generateNonce(): number {
    return Math.round(Math.random() * AuthenticationService.NONCE_RANGE);
  }
}

export default AuthenticationService;
