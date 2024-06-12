import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, EntityManager } from 'typeorm';
import { Bet } from '../domain/bet.entity';
import { User } from 'src/core/user/domain/user.entity';
import { StatusBet } from '../enums/status-bet.enum';
import { UserBet } from 'src/core/user/domain/user-bet.entity';
import { UserBetState } from 'src/core/user/enums/state-user.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CategoriesTransaction } from 'src/core/transaction/enums/categories.enum';

@Injectable()
export class BetSettlerService {
  constructor(
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
    private eventEmitter: EventEmitter2,
  ) {}

  async betSettlerChange(ids: number[], betOptionWin: 1 | 2 | 3, user: User) {
    return this.betRepository.manager.transaction(async (trx) => {
      const betsToSettler = await this.findBetsToSettle(trx, ids, betOptionWin);
      const usersWon = await this.findUsersWon(
        trx,
        betsToSettler,
        betOptionWin,
      );
      await this.processUserWins(trx, usersWon, user);
      await this.updateUserBets(trx, betsToSettler, betOptionWin);
      await this.updateBets(trx, ids, betOptionWin);

      return this.findBetsByIds(trx, ids);
    });
  }

  private async findBetsToSettle(
    trx: EntityManager,
    ids: number[],
    betOptionWin: 1 | 2 | 3,
  ) {
    return trx.find(Bet, {
      where: {
        eventId: In(ids),
        status: StatusBet.ACTIVE,
        betOption: betOptionWin,
      },
    });
  }

  private async findUsersWon(
    trx: EntityManager,
    betsToSettler: Bet[],
    betOptionWin: number,
  ) {
    return trx.find(UserBet, {
      relations: ['user', 'bet'],
      where: {
        bet: In(betsToSettler),
        state: UserBetState.OPEN,
        optionSelected: betOptionWin,
      },
    });
  }

  private async processUserWins(
    trx: EntityManager,
    usersWon: UserBet[],
    user: User,
  ) {
    for (const userWinner of usersWon) {
      const balanceWon = userWinner.amount * userWinner.bet.odd;
      userWinner.user.balance += balanceWon;
      userWinner.updated = user;
      await trx.save(userWinner);
      this.eventEmitter.emit(CategoriesTransaction.WINNING, {
        amount: userWinner.user.balance,
        userId: userWinner.id,
        userBet: userWinner.id,
      });
    }
  }

  private async updateUserBets(
    trx: EntityManager,
    betsToSettler: Bet[],
    betOptionWin: number,
  ) {
    await trx.update(
      UserBet,
      {
        where: {
          bet: In(betsToSettler),
          state: UserBetState.OPEN,
          optionSelected: !betOptionWin,
        },
      },
      { state: UserBetState.LOST },
    );
  }

  async updateUserWon(
    trx: EntityManager,
    betsToSettler: Bet[],
    betOptionWin: number,
  ) {
    await trx.update(
      UserBet,
      {
        where: {
          bet: In(betsToSettler),
          state: UserBetState.OPEN,
          optionSelected: betOptionWin,
        },
      },
      { state: UserBetState.WON },
    );
  }

  private async updateBets(
    trx: EntityManager,
    ids: number[],
    betOptionWin: number,
  ) {
    await trx.update(
      Bet,
      {
        where: {
          id: In(ids),
          status: StatusBet.ACTIVE,
          betOption: betOptionWin,
        },
      },
      { status: StatusBet.ACTIVE },
    );
  }

  private async findBetsByIds(trx: EntityManager, ids: number[]) {
    return trx.find(Bet, {
      where: {
        id: In(ids),
      },
    });
  }
}
