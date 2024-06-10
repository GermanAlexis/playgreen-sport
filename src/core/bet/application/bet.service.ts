import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBetDto } from '../infrastructure/dto/create-bet.dto';
import { In, Like, Repository } from 'typeorm';
import { Bet } from '../domain/bet.entity';
import { SearchDto } from '../infrastructure/dto/search-bet.dto';
import { User } from 'src/core/user/domain/user.entity';
import { UpdateBetDto } from '../infrastructure/dto/update-bet.dto';
import { StatusBet } from '../enums/status-bet.enum';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private readonly bet: Repository<Bet>,
  ) {}

  async create(createBetDto: CreateBetDto, user: User) {
    const newBet = this.bet.create(createBetDto);
    newBet.created = user;
    await this.bet.save(newBet);
    return this.findOne(newBet.id);
  }

  async findAll(searchDto: SearchDto) {
    const { limit, skip, ...rest } = searchDto;
    const where = this.buildFilter(rest);
    return await this.bet.findAndCount({
      where,
      take: limit,
      skip,
    });
  }

  async findOne(id: number) {
    const bet = await this.bet.findOneBy({ id });
    if (!bet)
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        message: 'call to admin',
        error: `Bet Not found with #id ${id} `,
      });
    return bet;
  }

  async update(id: number, updateBetDto: UpdateBetDto, user: User) {
    const betToUpdate = await this.findOne(id);
    this.betSettlerStatusValidate(betToUpdate);
    const betUpdate = await this.bet.preload({ id, ...updateBetDto });
    betUpdate.updated = user;
    await this.bet.save(betUpdate);
    return this.findOne(id);
  }

  betSettlerStatusValidate(bet: Bet) {
    if (bet.status === StatusBet.SETTLED)
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `Bet is ${StatusBet.SETTLED} status`,
      });
  }

  buildFilter(filter: { event: number[]; sport: string }) {
    return {
      eventId: filter.event ? In(filter.event) : undefined,
      sport: filter.sport ? Like(`%${filter.sport}%`) : undefined,
    };
  }
}
