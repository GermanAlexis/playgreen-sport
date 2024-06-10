import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from 'src/config/database/base-entity/base-entity';
import { UserBetState } from '../enums/state-user.enum';
import { User } from './user.entity';
import { Bet } from 'src/core/bet/domain/bet.entity';

@Entity()
export class UserBet extends BaseEntity {
  @Column({ type: 'float', nullable: false })
  odd: number;

  @Column({ type: 'float', nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: UserBetState, nullable: false })
  state: UserBetState;

  @Column({ type: 'int', nullable: false })
  optionSelected: number;

  @RelationId((ub: UserBet) => ub.bet)
  @Column('int')
  betId: number;

  @RelationId((ub: UserBet) => ub.user)
  @Column('int')
  userId: number;

  @ManyToOne(() => User, (user) => user.userBet)
  user: User;

  @ManyToOne(() => Bet, (bet) => bet.userBet)
  bet: Bet;
}
