export interface IROReduced {
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
  targetFunding: string;
  start: string;
  end: string;
  totalFunding: string;
  fundsWithdrawn: boolean;
  operationFee: string;
  treasuryFee: string;
  listingOwnerShare: string;
  shares: UserShare[];
}
