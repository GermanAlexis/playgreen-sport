import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './infrastructure/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserBet } from './domain/user-bet.entity';
import { UserBetService } from './application/user-bet.service';
import { UserBetController } from './infrastructure/user-bet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBet])],
  controllers: [UserController, UserBetController],
  providers: [UserService, UserBetService],
  exports: [UserService],
})
export class UserModule {}
