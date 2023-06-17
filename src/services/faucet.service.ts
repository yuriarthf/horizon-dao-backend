// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import usersModel from "@/models/users.model";

// Smart contract interaction
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

// Get Faucet contract ABI
import faucetContractABI from "@/abis/usdtMockABI.json";

// SECRETS
import { FAUCET_MANAGER_PK, ALCHEMY_KEY, FAUCET_CONTRACT_ADDRESS } from "@/config";

// Interfaces
import { User } from "@/interfaces/users.interface";

// Utils
import { isEmpty } from "@utils/util";

class FaucetService {
  static AMOUNT_OF_TOKENS_PER_USER = new BigNumber(10).pow(10).multipliedBy(5); // 50k Test USDT

  static rpcProvider = new ethers.AlchemyProvider("matic-mumbai", ALCHEMY_KEY);
  static faucetManager = new ethers.Wallet(FAUCET_MANAGER_PK, this.rpcProvider);
  static faucetContract = new ethers.Contract(FAUCET_CONTRACT_ADDRESS, faucetContractABI, this.faucetManager);

  public async hasRequestedTokens(address: string) {
    if (isEmpty(address)) throw new HttpException(400, "Address is empty");

    const findOne = await usersModel.findOne({ address });
    if (!findOne) throw new HttpException(400, "User doesn't exist");

    return {
      hasRequestedTokens: FaucetService.AMOUNT_OF_TOKENS_PER_USER.gt(findOne.testTokensRequested)
    }
  }

  public async requestTestTokens(user: User) {
    if (BigNumber(user.testTokensRequested) >= FaucetService.AMOUNT_OF_TOKENS_PER_USER)
      throw new HttpException(402, "Test tokens already requested for user");

    const amountToMint = FaucetService.AMOUNT_OF_TOKENS_PER_USER.minus(user.testTokensRequested);

    const txResponse = await FaucetService.faucetContract.freeMint(user.address, amountToMint.toString());

    // Wait for 3 confirmations on tx completion
    await txResponse.wait(3);

    await usersModel.findByIdAndUpdate(
      user._id,
      {
        testTokensRequested: FaucetService.AMOUNT_OF_TOKENS_PER_USER.toString()
      }
    );

    return {
      recipient: user.address,
      amountMinted: amountToMint.toString(),
      totalAmountMinted: FaucetService.AMOUNT_OF_TOKENS_PER_USER.toString(),
      faucetContractAddress: await FaucetService.faucetContract.getAddress(),
    };
  }
}

export default FaucetService;
