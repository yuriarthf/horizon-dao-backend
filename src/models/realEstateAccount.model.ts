import { getRealEstateAccountDocument, execute } from "./subgraph/graphclient";

interface IRealEstateAccount {
  address: string;
  balances: any;
}

type GetRealEstateAccountsResult = IRealEstateAccount[];

class RealEstateAccount {
  public getRealEstateAccountQuery: typeof getRealEstateAccountDocument;

  constructor() {
    this.getRealEstateAccountQuery = getRealEstateAccountDocument;
  }

  public async getRealEstateAccounts(account: string): Promise<GetRealEstateAccountsResult> {
    const result = await execute(this.getRealEstateAccountQuery, { account });
    return result?.data.realEstateAccounts;
  }
}

export default RealEstateAccount;
