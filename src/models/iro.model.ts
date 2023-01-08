import { getIrosDocument, getIroDocument, execute } from "./subgraph/graphclient";

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
    // WARN: It's a typo on the subgraph version itself,
    //    can be fixed after deploying a new instance of the subgraph
    commitedFunds: string;
    amount: string;
    share: string;
    claimed: boolean;
  }[];
}

class IRO {
  public getIrosQuery: typeof getIrosDocument;
  public getIroQuery: typeof getIroDocument;

  constructor() {
    this.getIrosQuery = getIrosDocument;
    this.getIroQuery = getIroDocument;
  }

  public async getIros(iroIds: string[]): Promise<GetIrosResult[]> {
    const result = await execute(this.getIrosQuery, { iroIds });
    return result?.data.iros;
  }

  public async getIro(iroId: string): Promise<GetIroResult> {
    const result = await execute(this.getIroQuery, { iroId });
    return result?.data.iros[0];
  }
}

export default IRO;
