import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { UserBet } from '../domain/user-bet.entity';
import { User } from '../domain/user.entity';
import { BetBulkDto } from '../infrastructure/dto/bet-bulk.dto';
import { Bet } from 'src/core/bet/domain/bet.entity';
import { StatusBet } from 'src/core/bet/enums/status-bet.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CategoriesTransaction } from 'src/core/transaction/enums/categories.enum';
import { UserBetDto } from '../infrastructure/dto/user-bet.dto';

@Injectable()
export class UserBetService {
  constructor(
    @InjectRepository(UserBet)
    private readonly userBetRepository: Repository<UserBet>,
    private eventEmitter: EventEmitter2,
  ) {}

  async processBets(items: BetBulkDto, user: User) {
    return this.userBetRepository.manager.transaction(async (trx) => {
      await this.validateBets(trx, items);
      const sumTotalAmount = items.items.reduce(
        (pre, curr) => pre + curr.amount,
        0,
      );
      await this.validateBalance(trx, sumTotalAmount, user);

      const bets = await this.createBet(trx, items.items, user);

      const currentBalance = (await trx.findOneBy(User, { id: user.id }))
        .balance;
      const balance = currentBalance - sumTotalAmount;
      trx.update(User, { id: user.id }, { balance, updated: user });
      return bets;
    });
  }

  async createBet(trx: EntityManager, items: UserBetDto[], user: User) {
    const betArray: UserBet[] = [];
    for (const bet of items) {
      const userBet = trx.create(UserBet, bet);
      userBet.userId = user.id;
      betArray.push(await trx.save(UserBet, userBet));
      this.eventEmitter.emit(CategoriesTransaction.BET, {
        amount: bet.amount,
        userId: user.id,
      });
    }
    return betArray;
  }

  private async validateBalance(
    trx: EntityManager,
    amount: number,
    user: User,
  ) {
    const userInTransaction = await trx.findOneBy(User, { id: user.id });
    if (!userInTransaction || amount > userInTransaction.balance) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `Insufficient balance for the transaction`,
      });
    }
  }

  private async validateBets(trx: EntityManager, items: BetBulkDto) {
    const betIds = items.items.map((bet) => bet.betId);

    const betsActives = await trx.find(Bet, {
      where: { id: In(betIds), status: StatusBet.ACTIVE },
    });

    if (betsActives.length !== items.items.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Any Bet had a changes',
      });
    }
  }
}
