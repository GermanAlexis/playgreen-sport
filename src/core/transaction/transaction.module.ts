import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TransactionService } from './application/transaction.service';
import { TransactionController } from './infrastructure/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './domain/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
