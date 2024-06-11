/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/user/infrastructure/dto/create-user.dto';
import { AuthGuard } from 'src/core/common/guards/auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate and log in a user using their credentials.',
  })
  @ApiBody({ type: LoginDto, description: 'Login credentials' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Login successful',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid credentials',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user with the provided details.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User registration information',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registration successful',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid registration information',
  })
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Verify Token',
    description: 'Verify the authenticity of the provided token.',
  })
  verifyToken(@Req() req: Request) {
    const token = req['token'];
    return this.authService.verifyToken(token);
  }
}
