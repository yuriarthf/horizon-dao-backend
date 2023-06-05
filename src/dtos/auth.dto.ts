import { IsNumber, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  public signature: string;
}

export class LogInDto {
  @IsNumber()
  public nonce: number;

  @IsString()
  public signature: string;
}
