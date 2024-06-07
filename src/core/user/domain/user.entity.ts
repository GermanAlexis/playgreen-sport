import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StateUser } from '../enums/state-user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  roleId: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('int')
  phone: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  gender: 'M' | 'F';

  @Column('timestamp')
  birth_date: Date;

  countryId: number;

  @Column('varchar')
  city: string;

  @Column('varchar')
  category: string;

  @Column('int')
  documentId: number;

  @Column({ type: 'enum', enum: StateUser })
  userState: StateUser;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  deletedBy: User;

  @Column('timestamp')
  deleted_at: Date;
}
