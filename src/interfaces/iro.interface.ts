export interface IROReduced {
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

export interface UserShare {
  address: string;
  committedFunds: string;
  amount: string;
  share: string;
  claimed: boolean;
}

export interface IRO {
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
  listingOwnerShare: string;
  shares: UserShare[];
}
