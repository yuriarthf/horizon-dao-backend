export interface IROProposal {
  tokenPrice: number;
  duration: number;
  tokenSupply: number;
  reservesFeePercentage?: number;
  treasuryFeePercentage?: number;
}

export interface Chat {
  creator: string;
  message: string;
  createdAt: number;
}

export interface Update {
  title: string;
  description: string;
  createdAt: number;
}

export interface Attributes {
  lotSizeSqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  yearBuilt?: number;
  latitude?: number;
  longitude?: number;
}

export interface TotalInvestmentValue {
  total: string;
  assetPrice: string;
  closingCosts?: string;
  transferTaxes: string;
  vacancyReserves: string;
  renovationReserves: string;
  upfrontSpvFees: string;
  tokenizationFees: string;
}

export interface TotalReturns {
  totalPercentage: string;
  projectedAppreciationPercentage?: string;
  cashOnCashReturnPercentage: string;
}

export interface AnnualGrossRents {
  total: string;
  propertyTaxes: string;
  insurance: string;
  propertyManagement: string;
  spvFeelingFees: string;
  annualCashflow: string;
  monthlyCashflow: string;
}

export interface Financials {
  totalInvestmentValue: TotalInvestmentValue;
  totalReturns: TotalReturns;
  annualGrossRents: AnnualGrossRents;
}

export interface Property {
  iroId?: number;
  realEstateNftId?: number;
  name: string;
  type: string;
  creator: string;
  description?: string;
  imageUrl: string;
  country?: string;
  region?: string;
  city?: string;
  address?: string;
  highlights?: string;
  market?: string;
  attributes?: Attributes;
  financials?: Financials;
  documentsUrl?: string;
  discussions?: Chat[];
  updates?: Update[];
  iroProposal?: IROProposal;
  createdAt: number;
  updatedAt: number;
}

export interface PropertyExtended extends Property {
  status?: string;
  iro?: {
    iroContractAddress: string;
    status: string;
    tokenPrice: string;
    currency: string;
    targetFunding: string;
    start: string;
    end: string;
    totalFunding: string;
    listingOwner: string;
    treasuryFee: string;
    operationFee: string;
    fundsWithdrawn: boolean;
    participants: string;
    fundingPercentage: string;
    shares: {
      address: string;
      committedFunds: string;
      purchasedAmount: string;
      iroShare: string;
      claimed: string;
    }[];
  };
}

export interface GetPropertiesPaginatedResult {
  docs: PropertyExtended[];
  paginationMetadata: {
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page?: number;
    totalPages: number;
    offset: number;
    prevPage?: number | null;
    nextPage?: number | null;
    pagingCounter: number;
  };
}
