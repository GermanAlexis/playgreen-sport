import { Column, Entity, ManyToOne } from 'typeorm';
import { UserState, RoleEnum } from '../enums/index';
import { BaseEntity } from 'src/config/database/base-entity/base-entity';
import { UserBet } from './user-bet.entity';

@Entity()
export class User extends BaseEntity {
  @Column('int', { nullable: false, unique: true })
  documentId: number;

  @Column('varchar', { nullable: false })
  firstName: string;

  @Column('varchar', { nullable: false })
  lastName: string;

  @Column('varchar', { nullable: false })
  phone: number;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('varchar', { nullable: false, unique: true })
  userName: string;

  @Column('varchar')
  gender: 'M' | 'F';

  @Column('timestamp')
  birthDate: Date;

  @Column('int')
  countryId: number;

  @Column('varchar')
  city: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  category: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @Column({ type: 'enum', enum: UserState })
  userState: UserState;

  @ManyToOne(() => UserBet, (user) => user.user)
  userBet: UserBet;
}
