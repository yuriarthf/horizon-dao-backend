import { getIrosDocument, getIroDocument, getUserSharesDocument, execute } from "./subgraph/graphclient";

interface GetIrosResult {
  iroId: string;
  status: string;
  unitPrice: string;
  currency: string;
  currencyDecimals: string;
  softCap: string;
  hardCap: string;
  start: string;
  end: string;
  totalFunding: string;
}

interface GetIroResult {
  iroId: string;
  status: string;
  unitPrice: string;
  currency: string;
  currencyDecimals: string;
  softCap: string;
  hardCap: string;
  start: string;
  end: string;
  totalFunding: string;
  fundsWithdrawn: boolean;
  ownerClaimed: boolean;
  reservesFee: string;
  treasuryFee: string;
  listingOwner: string;
  listingOwnerShare: string;
  shares: {
    address: string;
    committedFunds: string;
    amount: string;
    share: string;
    claimed: boolean;
  }[];
}

class IRO {
  public getIrosQuery: typeof getIrosDocument;
  public getIroQuery: typeof getIroDocument;
  public getUserSharesQuery: typeof getUserSharesDocument;

  constructor() {
    this.getIrosQuery = getIrosDocument;
    this.getIroQuery = getIroDocument;
    this.getUserSharesQuery = getUserSharesDocument;
  }

  public async getIros(iroIds: string[]): Promise<GetIrosResult[]> {
    const result = await execute(this.getIrosQuery, { iroIds });
    return result?.data.iros;
  }

  public async getIro(iroId: string): Promise<GetIroResult> {
    const result = await execute(this.getIroQuery, { iroId });
    return result?.data.iros[0];
  }

  public async getUserShare(user: string) {
    const result = await execute(this.getUserSharesQuery, { user });
    return result?.data.userShares;
  }
}

export default IRO;
