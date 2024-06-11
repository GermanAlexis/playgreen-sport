import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './infrastructure/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserBet } from './domain/user-bet.entity';
import { UserBetService } from './application/user-bet.service';
import { UserBetController } from './infrastructure/user-bet.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBet]), EventEmitterModule],
  controllers: [UserController, UserBetController],
  providers: [UserService, UserBetService],
  exports: [UserService],
})
export class UserModule {}
