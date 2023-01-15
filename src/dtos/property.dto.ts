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
  ValidateIf,
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

export class FinancialsInputDto {
  @IsNumber()
  public assetPrice: number;

  @ValidateIf(obj => !obj.tokenSupply || obj.tokenPrice)
  @IsNumber()
  public tokenPrice: number;

  @ValidateIf(obj => !obj.tokenPrice || obj.tokenSupply)
  @IsNumber()
  public tokenSupply: number;

  @IsNumber()
  public monthlyCashflow: number;
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

  @IsOptional()
  @IsString()
  public zip: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AttributesDto)
  public attributes: AttributesDto;

  @IsObject()
  @ValidateNested()
  @Type(() => FinancialsInputDto)
  public financialInput: FinancialsInputDto;

  @IsOptional()
  @IsString()
  public highlights: string;

  @IsOptional()
  @IsString()
  public market: string;
}
