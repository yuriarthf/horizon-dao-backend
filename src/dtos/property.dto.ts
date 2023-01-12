import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsEthereumAddress,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsObject,
  ValidateNested,
  Min,
  Max,
} from "class-validator";

import { Type } from "class-transformer";

class AttributesDto {
  @IsOptional()
  @IsNumber()
  public area: number;

  @IsOptional()
  @IsNumber()
  public bedrooms: number;

  @IsOptional()
  @IsNumber()
  public bathrooms: number;

  @IsOptional()
  @IsNumber()
  public parking: number;

  @IsOptional()
  @IsNumber()
  public yearBuilt: number;

  @IsOptional()
  @IsNumber()
  @IsLatitude()
  public latitude: number;

  @IsOptional()
  @IsNumber()
  @IsLongitude()
  public longitude: number;
}

class FinancialsDto {
  @IsNumber()
  public tokenPrice: number;

  @IsNumber()
  public assetPrice: number;

  @IsNumber()
  public annualCashflow: number;

  @IsNumber()
  public monthlyCashflow: number;

  @IsNumber()
  public closingCosts: number;

  @IsNumber()
  public insurancePremium: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  public propertyTaxPercentage: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  public managementFeePercentage: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  public commonFeePercentage: number;
}

export class CreatePropertyDto {
  @IsEthereumAddress()
  public creator: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsUrl()
  public imageUrl: string;

  @IsUrl()
  @IsOptional()
  public documentsUrl: string;

  @IsOptional()
  @IsString()
  public country: string;

  @IsOptional()
  @IsString()
  public region: string;

  @IsOptional()
  @IsString()
  public city: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AttributesDto)
  public attributes: AttributesDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FinancialsDto)
  public financials: FinancialsDto;

  @IsOptional()
  @IsString()
  public highlights: string;

  @IsOptional()
  @IsString()
  public market: string;
}
