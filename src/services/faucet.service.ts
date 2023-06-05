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
import { User } from "@interfaces/users.interface";

class FaucetService {
  static AMOUNT_OF_TOKENS_PER_USER = new BigNumber(10).pow(13); // 100k Test USDT

  static rpcProvider = new ethers.AlchemyProvider("matic-mumbai", ALCHEMY_KEY);
  static faucetManager = new ethers.Wallet(FAUCET_MANAGER_PK, this.rpcProvider);
  static faucetContract = new ethers.Contract(FAUCET_CONTRACT_ADDRESS, faucetContractABI, this.faucetManager);

  public async requestTestTokens(user: User) {
    if (BigNumber(user.testTokensRequested) >= FaucetService.AMOUNT_OF_TOKENS_PER_USER)
      throw new HttpException(402, "Test tokens already requested for user");

    const amountToMint = FaucetService.AMOUNT_OF_TOKENS_PER_USER.minus(user.testTokensRequested);

    const txResponse = await FaucetService.faucetContract.freeMint(user.address, amountToMint);

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
      faucetContractAddress: FaucetService.faucetContract.address,
    };
  }
}

export default FaucetService;
