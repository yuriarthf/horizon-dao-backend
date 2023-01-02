import { getIrosDocument, getIroDocument, execute } from "./subgraph/.graphclient";

interface GetIrosResult {
  iros: {
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
  }[];
}

interface GetIroResult {
  iros: {
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
      commitedFunds: string;
      amount: string;
      share: string;
      claimed: boolean;
    }[];
  };
}

class IRO {
  public getIrosQuery: typeof getIrosDocument;
  public getIroQuery: typeof getIroDocument;

  constructor() {
    this.getIrosQuery = getIrosDocument;
    this.getIroQuery = getIroDocument;
  }

  public async getIros(iroIds: string[]): Promise<GetIrosResult> {
    const result = await execute(this.getIrosQuery, { variables: { iroIds } });
    return result?.data;
  }

  public async getIro(iroId: string): Promise<GetIroResult> {
    const result = await execute(this.getIroQuery, { variables: { iroId } });
    return result?.data;
  }
}

export default IRO;
