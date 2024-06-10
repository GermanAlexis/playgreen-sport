import { Module } from '@nestjs/common';
import { BetService } from './application/bet.service';
import { BetController } from './infrastructure/bet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './domain/bet.entity';
import { BetSettlerService } from './application/bet-settler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  controllers: [BetController],
  providers: [BetService, BetSettlerService],
})
export class BetModule {}
