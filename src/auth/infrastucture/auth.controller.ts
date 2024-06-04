import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify')
  verifyToken(@Req() req: Request) {
    const token = req['token'];
    return this.authService.verifyToken(token);
  }
}
