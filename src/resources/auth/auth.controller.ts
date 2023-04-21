import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from './auth.guard';
import { UserPresenter } from '../user/user.presenter';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @HttpCode(200)
  @Post('/register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('/validate')
  async validate(@Req() req: Request & { user: UserPresenter }) {
    return {
      user: req.user,
    };
  }
}
