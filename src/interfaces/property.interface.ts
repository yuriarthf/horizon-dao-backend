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
  total: number;
  assetPrice: number;
  closingCosts?: number;
  transferTaxes: number;
  vacancyReserves: number;
  renovationReserves: number;
  upfrontSpvFees: number;
  tokenizationFees: number;
}

export interface TotalReturns {
  totalPercentage: number;
  projectedAppreciationPercentage?: number;
  cashOnCashReturnPercentage: number;
}

export interface AnnualGrossRents {
  total: number;
  propertyTaxes: number;
  insurance: number;
  propertyManagement: number;
  spvFeelingFees: number;
  annualCashflow: number;
  monthlyCashflow: number;
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
  iro?: {
    status: string;
    tokenPrice: string;
    currency: string;
    softCap: string;
    hardCap: string;
    start: string;
    end: string;
    totalFunding: string;
    listingOwner: string;
    listingOwnerShare: string;
    treasuryFee: string;
    reservesFee: string;
    fundsWithdrawn: boolean;
    ownerClaimed: boolean;
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
