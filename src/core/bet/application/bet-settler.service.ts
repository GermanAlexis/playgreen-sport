import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, EntityManager } from 'typeorm';
import { Bet } from '../domain/bet.entity';
import { User } from 'src/core/user/domain/user.entity';
import { StatusBet } from '../enums/status-bet.enum';
import { UserBet } from 'src/core/user/domain/user-bet.entity';
import { UserBetState } from 'src/core/user/enums/state-user.enum';

@Injectable()
export class BetSettlerService {
  constructor(
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
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
      const balanceWon = userWinner.amount * userWinner.odd;
      const userFound = await trx.findOneBy(User, { id: userWinner.userId });

      if (userFound) {
        userFound.balance += balanceWon;
        userFound.updated = user;
        await trx.save(userFound);
      }
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
          optionSelected: betOptionWin,
        },
      },
      { state: UserBetState.WON },
    );

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
