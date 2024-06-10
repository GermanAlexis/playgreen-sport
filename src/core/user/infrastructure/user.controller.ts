import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Controller,
  Query,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from '../application/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/common/dtos/pagination.dto';
import { User } from '../domain/user.entity';
import { GetUser } from 'src/core/common/decorators/get-user.decorator';
import { AuthGuard } from 'src/core/common/guards/auth.guard';
import { BalanceUserDto } from './dto/balance-user-.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.userService.findAll(pagination);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.update(id, updateUserDto, user);
  }

  @Put('withdraw/:id')
  withdrawCash(
    @Param('id', ParseIntPipe) id: number,
    @Body() balanceUserDto: BalanceUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.cashTransaction(
      { id, amount: balanceUserDto.amount, isWithDraw: true },
      user,
    );
  }

  @Put('deposit/:id')
  depositCash(
    @Param('id', ParseIntPipe) id: number,
    @Body() balanceUserDto: BalanceUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.cashTransaction(
      { id, amount: balanceUserDto.amount, isWithDraw: false },
      user,
    );
  }
}
