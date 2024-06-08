import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { envs } from 'src/config/envs';

import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtCustomService } from './application/jwt.service';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtCustomService],
  exports: [AuthService],
})
export class AuthModule {}
