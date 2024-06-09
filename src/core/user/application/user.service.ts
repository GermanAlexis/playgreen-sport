import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../infrastructure/dto/create-user.dto';
import { UpdateUserDto } from '../infrastructure/dto/update-user.dto';
import { User } from '../domain/user.entity';

import { RoleEnum, UserState } from '../enums';
import { PaginationDto } from 'src/core/common/dtos/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.user.create(createUserDto);
    user.createdBy = 1;
    const passHashed = await this.hashPass(user.password);
    await this.user.save({ ...user, password: passHashed });
    const useReturn = await this.user.findOneBy({ id: user.id });
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
    console.log('getUser: ', getUser);
    const userToUpdate = await this.user.findOneByOrFail({ id });
    this.validateRoleAdmin(userToUpdate, getUser);

    const userUpdated = await this.user.preload(updateUserDto);
    await this.user.save({ ...userUpdated });
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
