import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { CreateUserDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await userModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await userModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await userModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await userModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public generateNonce = () => {
    return Math.random();
  };

  public toHex = (stringToConvert: string) => {
    return stringToConvert
      .split("")
      .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  };

  public async walletNonce(address?: string | any) {
    const nonce = this.generateNonce();

    if (address) {
      const findUser: User = await userModel.findOne({ address });
      if (!findUser || !findUser.nonce) {
        const user = await userModel.create({
          address: address,
          nonce: nonce,
          type: "wallet",
          role: "user",
          email: "",
          password: "",
        });
        return user;
      } else {
        const updateUserById: User = await userModel.findByIdAndUpdate(findUser._id, { nonce });
        return updateUserById;
      }
    } else throw new HttpException(400, "address is empty");
  }
  public async verifyWallet(address: string, signature: string) {
    if (address) {
      const findUser: User = await userModel.findOne({ address });
      const nonce = findUser.nonce;

      const recovered_address = recoverPersonalSignature({
        data: `0x${this.toHex(nonce)}`,
        signature: signature,
      }).toLowerCase();

      if (recovered_address === address.toLowerCase()) {
        const userUpdated: User = await userModel.findByIdAndUpdate(findUser._id, { nonce: this.generateNonce() });
        const tokenData = this.createToken(userUpdated);
        const cookie = this.createCookie(tokenData);

        return { cookie, userUpdated };
      }
    } else throw new HttpException(400, "address is empty");
  }
}

export default AuthService;
