import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../infrastructure/dto/create-user.dto';
import { UpdateUserDto } from '../infrastructure/dto/update-user.dto';
import { User } from '../domain/user.entity';

import { RoleEnum, UserState } from '../enums';
import { PaginationDto } from 'src/core/common/dtos/pagination.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CategoriesTransaction } from 'src/core/transaction/enums/categories.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.user.create(createUserDto);
    user.created = user;
    const passHashed = await this.hashPass(user.password);
    const newUser = await this.user.save({ ...user, password: passHashed });
    const useReturn = await this.user.findOneBy({ id: newUser.id });
    delete useReturn.password;
    return useReturn;
  }

  async findAll(pagination: PaginationDto) {
    const { limit, skip } = pagination;

    return this.user.findAndCount({
      withDeleted: false,
      take: limit,
      skip,
    });
  }

  async findOneByEmail(email: string) {
    return this.user.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto, getUser: User) {
    const userToUpdate = await this.user.findOneByOrFail({ id });
    this.validateRoleAdmin(userToUpdate, getUser);

    const userUpdated = await this.user.preload(updateUserDto);
    userUpdated.updated = getUser;
    await this.user.save({ ...userUpdated });
    return this.user.find({ where: { id } });
  }

  async cashTransaction(
    values: { id: number; amount: number; isWithDraw: boolean },
    getUser: User,
  ) {
    const { id, amount, isWithDraw } = values;
    const user = await this.user.findOneByOrFail({ id });
    let currentAmount = user.balance;

    if (isWithDraw) {
      if (currentAmount < amount)
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          message: `The current balance is less than the amount entered - The balance is ${currentAmount}.`,
        });

      currentAmount = currentAmount - amount;
      this.eventEmitter.emit(CategoriesTransaction.WITHDRAW, {
        amount,
        userId: user.id,
      });
    } else {
      currentAmount = currentAmount + amount;
      this.eventEmitter.emit(CategoriesTransaction.DEPOSIT, {
        amount,
        userId: user.id,
      });
    }
    return this.updateBalance(id, currentAmount, getUser);
  }

  async updateBalance(id: number, balance: number, getUser: User) {
    await this.user.update(id, {
      balance,
      updated: getUser,
    });

    return this.user.find({ where: { id } });
  }

  async validateRoleAdmin(userToUpdate: User, getUser: User) {
    if (
      userToUpdate.role === getUser.role ||
      (userToUpdate.userState === UserState.BLOCKED &&
        getUser.role === RoleEnum.ADMIN)
    )
      throw new BadRequestException({
        status: 401,
        message: `a User with Role Admin not is Allow`,
      });
  }

  async hashPass(pass: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(pass, saltOrRounds);
  }
}
