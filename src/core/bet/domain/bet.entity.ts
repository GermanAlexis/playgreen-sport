import { Entity, Column, ManyToOne } from 'typeorm';
import { StatusBet, ResultBet } from '../enums/status-bet.enum';
import { UserBet } from 'src/core/user/domain/user-bet.entity';
import { BaseEntity } from 'src/config/database/base-entity/base-entity';

@Entity()
export class Bet extends BaseEntity {
  @Column('int', { nullable: false })
  betOption: 1 | 2 | 3;

  @Column('varchar', { nullable: false })
  sport: string;

  @Column({ type: 'enum', enum: StatusBet, nullable: false })
  status: StatusBet;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('int', { nullable: false })
  eventId: number;

  @Column({ type: 'float', nullable: false })
  odd: number;

  @Column({ type: 'enum', enum: ResultBet, nullable: true })
  result: ResultBet;

  @ManyToOne(() => UserBet, (userBet) => userBet.bet)
  userBet: UserBet;
}
