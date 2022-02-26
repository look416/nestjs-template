import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../user/user.interface';
import { AccessToken } from './auth.interface';
import {MinLength} from 'class-validator';

export class RegisterUserRequest implements Partial<User> {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}

export class RegisterUserResponse implements Partial<User> {
  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  username: string;
}

export class LoginUserRequest extends RegisterUserRequest {}
export class LoginUserResponse implements Partial<User>, AccessToken {
  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  accessToken: string;
}
