import { IsString, IsNotEmpty, IsArray, IsUrl, IsNumber, IsOptional, ValidateNested } from "class-validator";

import { Type } from "class-transformer";

class AttributesDto {
  @IsNotEmpty()
  @IsString()
  public value: string;

  @IsNotEmpty()
  @IsString()
  public trait_type: string;
}

export class CreateRealEstateNftDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsOptional()
  @IsUrl()
  public image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributesDto)
  public attributes: AttributesDto[];

  @IsOptional()
  @IsUrl()
  public external_url: string;
}
