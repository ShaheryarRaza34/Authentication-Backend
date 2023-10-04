import {
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UserLoginResponseDto {
  @IsString()
  @IsNotEmpty()
  public token: string;
}
