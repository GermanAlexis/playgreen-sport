import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './infrastructure/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserBet } from './domain/user-bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBet])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
