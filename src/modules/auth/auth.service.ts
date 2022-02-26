import { UsersService } from '../user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserRequest, RegisterUserResponse } from './auth.dto';
import { User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './auth.interface';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<User & AccessToken> {
    const accessToken = this.jwtService.sign(user);
    return { ...user, accessToken };
  }

  async register({ username, password }: RegisterUserRequest): Promise<RegisterUserResponse> {

    if (await this.usersService.findOne(username)) {
      throw new ConflictException('Username already exists');
    }
    return this.usersService.create(username, password);
  }
}
