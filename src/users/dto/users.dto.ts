import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public gender: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public password: string;
}
export class UserRegisterResponseDto {
  @IsString()
  message: string;
}
