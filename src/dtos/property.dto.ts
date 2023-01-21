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
  IsInt,
  IsDivisibleBy,
} from "class-validator";

import { IsMultipleOf } from "./custom";

import { Type } from "class-transformer";

class AttributesDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  public area: number;

  @IsOptional()
  @IsInt()
  public bedrooms: number;

  @IsOptional()
  @IsInt()
  public bathrooms: number;

  @IsOptional()
  @IsInt()
  public parking: number;

  @IsOptional()
  @IsInt()
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
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsMultipleOf("tokenPrice", { message: "assetPrice should be a multiple of tokenPrice" })
  public assetPrice: number;

  @ValidateIf(obj => !obj.tokenSupply || obj.tokenPrice)
  @IsNumber({ maxDecimalPlaces: 2 })
  public tokenPrice: number;

  @ValidateIf(obj => !obj.tokenPrice || obj.tokenSupply)
  @IsInt()
  public tokenSupply: number;

  @IsNumber({ maxDecimalPlaces: 2 })
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
