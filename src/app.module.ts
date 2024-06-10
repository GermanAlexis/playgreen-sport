import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { BetModule } from './core/bet/bet.module';
import { TransactionModule } from './core/transaction/transaction.module';
import config from './config/database/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
    BetModule,
    TransactionModule,
  ],
})
export class AppModule {}
