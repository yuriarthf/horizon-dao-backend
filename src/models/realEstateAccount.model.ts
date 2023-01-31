import { getRealEstateAccountDocument, execute } from "./subgraph/graphclient";

interface Balance {
  tokenId: string;
  amount: string;
}

type GetAccountBalancesResult = Balance[];

class RealEstateAccount {
  public getRealEstateAccountQuery: typeof getRealEstateAccountDocument;

  constructor() {
    this.getRealEstateAccountQuery = getRealEstateAccountDocument;
  }

  public async getAccountBalances(account: string): Promise<GetAccountBalancesResult> {
    const result = await execute(this.getRealEstateAccountQuery, { account });
    return result?.data.balances;
  }
}

export default RealEstateAccount;
