import { LocalAuthGuard } from './local.-auth.guard';
import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './auth.decorator';
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from './auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() _: LoginUserRequest,
  ): Promise<LoginUserResponse> {
    const result = await this.authService.login(req.user);
    return plainToInstance(LoginUserResponse, result, { strategy: 'excludeAll' });
  }

  @Public()
  @Post('register')
  async register(
    @Body() req: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    const result = await this.authService.register(req);
    return plainToInstance(RegisterUserResponse, result, { strategy: 'excludeAll' });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
