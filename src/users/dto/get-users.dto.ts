import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class GetUsersItemDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  gender: string;
}
export class GetUsersResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetUsersItemDto)
  data: Array<GetUsersItemDto>;
  @IsNumber()
  totalUsers: number;
}
