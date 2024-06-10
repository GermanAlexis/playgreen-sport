import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../domain/transaction.entity';
import { In, Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { CategoriesTransaction } from '../enums/categories.enum';
import { SearchTransactionDto } from '../dtos/search.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly trans: Repository<Transaction>,
  ) {}

  async getTransaction(searchTransaction: SearchTransactionDto) {
    const { limit, skip, ...rest } = searchTransaction;
    const where = this.buildFilter(rest);
    return this.trans.findAndCount({
      where,
      take: limit,
      skip,
    });
  }

  @OnEvent(CategoriesTransaction.BET)
  async bet(t: { amount: number; userId: number }) {
    await this.createTransaction({
      amount: t.amount,
      category: CategoriesTransaction.BET,
      userId: t.userId,
    });
  }

  @OnEvent(CategoriesTransaction.DEPOSIT)
  async deposit(t: { amount: number; userId: number }) {
    await this.createTransaction({
      amount: t.amount,
      category: CategoriesTransaction.DEPOSIT,
      userId: t.userId,
    });
  }

  @OnEvent(CategoriesTransaction.WINNING)
  async winning(t: { amount: number; userId: number; userBetId: number }) {
    await this.createTransaction({
      amount: t.amount,
      category: CategoriesTransaction.WINNING,
      userId: t.userId,
      userBetId: t.userBetId,
    });
  }

  @OnEvent(CategoriesTransaction.WITHDRAW)
  async withdraw(t: { amount: number; userId: number }) {
    await this.createTransaction({
      amount: t.amount,
      category: CategoriesTransaction.WINNING,
      userId: t.userId,
    });
  }

  async createTransaction(createTrans: Partial<Transaction>) {
    const t = this.trans.create(createTrans);
    await this.trans.save(t);
  }

  buildFilter(filter: { usersIds: number[]; category: CategoriesTransaction }) {
    return {
      userId: filter.usersIds ? In(filter.usersIds) : undefined,
      category: filter.category ? filter.category : undefined,
    };
  }
}
