import { Module } from '@nestjs/common';
import { BetService } from './application/bet.service';
import { BetController } from './infrastructure/bet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './domain/bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule {}
