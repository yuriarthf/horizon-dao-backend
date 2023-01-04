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
  IsDateString,
} from "class-validator";

import { Type } from "class-transformer";

class AttributesDto {
  @IsOptional()
  @IsNumber()
  public lotSizeSqm: number;

  @IsOptional()
  @IsNumber()
  public usableAreaSqm: number;

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

  @IsOptional()
  @IsNumber()
  public laserShooter: number;
}

class FinancialsDto {
  @IsNotEmpty()
  @IsString()
  public message: string;

  @IsNotEmpty()
  @IsDateString()
  public date: Date;
}

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsEthereumAddress()
  public creator: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsUrl()
  public imageUrl: string;

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
  public highlights: string;

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
}
