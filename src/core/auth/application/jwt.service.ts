import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/envs';
import { CreateUserDto } from 'src/core/user/infrastructure/dto/create-user.dto';

@Injectable()
export class JwtCustomService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(payload: CreateUserDto) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: envs.jwtSecret,
    });
  }
}
