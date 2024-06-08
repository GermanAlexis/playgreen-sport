import { User } from 'src/core/user/domain/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @RelationId((be: BaseEntity) => be.created)
  @Column('int')
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @RelationId((be: BaseEntity) => be.updated)
  @Column('int', { nullable: true })
  updatedBy: number;

  @RelationId((be: BaseEntity) => be.deleted)
  @Column('int', { nullable: true })
  deletedBy: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  created: User;

  @ManyToOne(() => User)
  updated: User;

  @ManyToOne(() => User)
  deleted: User;
}
