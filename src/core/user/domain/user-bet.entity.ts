import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/database/base-entity/base-entity';
import { UserBetState } from '../enums/state-user.enum';
import { User } from './user.entity';

@Entity()
export class UserBet extends BaseEntity {
  @Column('float', { nullable: false })
  odd: number;

  @Column('float', { nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: UserBetState, nullable: false })
  state: UserBetState;

  @ManyToOne(() => User, (user) => user.userBet)
  user: User;

  // @ManyToOne(() => User, (user) => user.userBet)
  // user: User;
}
