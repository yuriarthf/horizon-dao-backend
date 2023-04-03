import {
  getIrosByStatusDocument,
  getIrosByIdDocument,
  getIroDocument,
  getUserSharesDocument,
  execute,
} from "./subgraph/graphclient";

interface GetIrosResult {
  iroId: string;
  iroContractAddress: string;
  status: string;
  unitPrice: string;
  currency: string;
  currencyDecimals: string;
  targetFunding: string;
  start: string;
  end: string;
  totalFunding: string;
}

interface GetIroResult {
  iroId: string;
  iroContractAddress: string;
  status: string;
  unitPrice: string;
  currency: string;
  currencyDecimals: string;
  targetFunding: string;
  start: string;
  end: string;
  totalFunding: string;
  fundsWithdrawn: boolean;
  operationFee: string;
  treasuryFee: string;
  listingOwner: string;
  shares: {
    address: string;
    committedFunds: string;
    amount: string;
    share: string;
    claimed: boolean;
  }[];
}

class IRO {
  public getIrosByIdQuery: typeof getIrosByIdDocument;
  public getIrosByStatusQuery: typeof getIrosByStatusDocument;
  public getIroQuery: typeof getIroDocument;
  public getUserSharesQuery: typeof getUserSharesDocument;

  constructor() {
    this.getIrosByIdQuery = getIrosByIdDocument;
    this.getIrosByStatusQuery = getIrosByStatusDocument;
    this.getIroQuery = getIroDocument;
    this.getUserSharesQuery = getUserSharesDocument;
  }

  public async getIrosById(iroIds: string[]): Promise<GetIrosResult[]> {
    const result = await execute(this.getIrosByIdQuery, { iroIds });
    return result?.data.iros;
  }

  public async getIrosByStatus(statuses: string[]): Promise<GetIrosResult[]> {
    const result = await execute(this.getIrosByStatusQuery, { statuses });
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
