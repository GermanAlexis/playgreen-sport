import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { UserBet } from 'src/core/user/domain/user-bet.entity';
import { BaseEntity } from 'src/config/database/base-entity/base-entity';
import { CategoriesTransaction } from '../enums/categories.enum';
import { User } from 'src/core/user/domain/user.entity';

@Entity()
export class Transaction extends BaseEntity {
  @Column('int', { nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: CategoriesTransaction, nullable: false })
  category: CategoriesTransaction;

  @RelationId((ub: Transaction) => ub.userBet)
  @Column('int', { nullable: true })
  userBetId: number;

  @RelationId((ub: Transaction) => ub.user)
  @Column('int')
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => UserBet)
  userBet: UserBet;
}
