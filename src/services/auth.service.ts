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
  static AUTHENTICATION_MESSAGE =
    "Please sign this message to confirm and verify your wallet address for future editing access.";

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

    const newUser = await userModel.create({ address: signingAddress, nonce });

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
      AuthenticationService.AUTHENTICATION_MESSAGE,
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
    message: string = AuthenticationService.AUTHENTICATION_MESSAGE,
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

  static async retrieveAddress(hashedMessage: string, signature: string): Promise<string> {
    return ethers.verifyMessage(hashedMessage, signature);
  }

  static retrieveAddressFromSignature(message: string, signature: string, nonce?: number) {
    const hashedMessage = AuthenticationService.hashEip191(message, nonce);

    return ethers.verifyMessage(hashedMessage, signature);
  }

  static async verifySignature(
    message: string,
    signature: string,
    nonce?: number,
  ): Promise<{ valid: boolean; signingAddress: string; user?: User; }> {
    const signingAddress = AuthenticationService.retrieveAddressFromSignature(message, signature, nonce);

    const user = await userModel.findOne({ address: signingAddress });
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

  static hashEip191(message: string, nonce?: number) {
    nonce ?? (message += `+${nonce}`);
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
