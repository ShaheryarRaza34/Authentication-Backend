import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from './dto/users.dto';
import { UsersService } from './users.service';
import {
  UserLoginResponseDto,
  UserLoginRequestDto,
} from './dto/users-login.dto';
import { GetUsersResponseDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  register(
    @Body() user: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    return this.userService.createUser(user);
  }

  @Post('login')
  async login(
    @Body() user: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return this.userService.findUser(user);
  }

  @Get()
  findAll(): Promise<GetUsersResponseDto> {
    return this.userService.findAll();
  }
}
