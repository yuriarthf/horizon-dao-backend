export interface Attributes {
  lotSizeSqm?: number;
  usableAreaSqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  yearBuilt?: number;
  latitude?: number;
  longitude?: number;
  laserShooter?: number;
}

export interface Financials {
  assetPrice?: number;
  annualCashflow?: number;
  monthlyCashflow?: number;
  closingCosts?: number;
  insurancePremium?: number;
  propertyTaxPercentage?: number;
  managementFeePercentage?: number;
  commonFeePercentage?: number;
}

export interface Update {
  message: string;
  date: Date;
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
  attributes?: Attributes;
  financials?: Financials;
  documentsUrl?: string;
  updates?: Update[];
}

export interface PropertyExtended extends Property {
  iro?: {
    status: string;
    unitPrice: string;
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
  }
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
