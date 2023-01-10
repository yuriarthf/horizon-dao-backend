import { IsEmail, IsString, IsOptional, IsNumber, IsEthereumAddress } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;

  @IsOptional()
  @IsNumber()
  public nonce: number;

  @IsOptional()
  @IsEthereumAddress()
  public address: string;

  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsString()
  public role: string;
}

export class UpdatedUserDto {
  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;

  @IsOptional()
  @IsEthereumAddress()
  public address: string;

  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsString()
  public role: string;
}
