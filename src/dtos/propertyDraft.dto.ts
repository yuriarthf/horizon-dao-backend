import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsObject,
  ValidateNested,
  ValidateIf,
  IsInt,
  IsEthereumAddress,
} from "class-validator";

import { IsMultipleOf } from "./custom";

import { Type } from "class-transformer";

class AttributesDraftDto {
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

export class FinancialsInputDraftDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsMultipleOf("tokenPrice", { message: "assetPrice should be a multiple of tokenPrice" })
  public assetPrice: number;

  @IsOptional()
  @ValidateIf(obj => !obj.tokenSupply || obj.tokenPrice)
  @IsNumber({ maxDecimalPlaces: 2 })
  public tokenPrice: number;

  @IsOptional()
  @ValidateIf(obj => !obj.tokenPrice || obj.tokenSupply)
  @IsInt()
  public tokenSupply: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  public monthlyCashflow: number;
}

export class saveDraftDto {
  @IsNotEmpty()
  @IsString()
  public signature: string;

  @IsNotEmpty()
  @IsEthereumAddress()
  public creator: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsUrl()
  public imageUrl: string;

  @IsOptional()
  @IsUrl()
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AttributesDraftDto)
  public attributes: AttributesDraftDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FinancialsInputDraftDto)
  public financialInput: FinancialsInputDraftDto;

  @IsOptional()
  @IsString()
  public highlights: string;

  @IsOptional()
  @IsString()
  public market: string;
}
