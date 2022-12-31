export interface Attributes {
	lotSizeSqm?: string;
	usableAreaSqm?: number;
	bedrooms?: number;
	bathrooms?: number;
	parking?: number;
	yearBuilt?: number;
	latitude?: string;
	longitude?: string;
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
	status: string;
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
	iroStatus?: string;
	iroUnitPrice?: string;
	iroCurrency?: string;
	iroSoftCap?: string;
	iroHardCap?: string;
	iroStart?: string;
	iroEnd?: string;
}