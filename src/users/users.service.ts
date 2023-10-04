import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from './dto/users.dto';
import {
  UserLoginRequestDto,
  UserLoginResponseDto,
} from './dto/users-login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersResponseDto } from './dto/get-users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<GetUsersResponseDto> {
    try {
      const users = await this.prismaService.users.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          gender: true,
        },
      });
      const response = new GetUsersResponseDto();
      response.data = users;
      response.totalUsers = users.length;
      return response;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async createUser(
    user: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    try {
      const hashPassword = await bcrypt.hash(user.password, 10);
      await this.prismaService.users.create({
        data: { ...user, password: hashPassword },
      });
      return { message: 'User created successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUser(user: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const selectedUser = await this.prismaService.users.findUnique({
      where: { email: user.email },
    });
    if (selectedUser && selectedUser.id) {
      if (await bcrypt.compare(user.password, selectedUser.password)) {
        const payload = { email: selectedUser.email, sub: selectedUser.id };
        const token = await this.jwtService.signAsync(payload);
        return { token: token };
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
