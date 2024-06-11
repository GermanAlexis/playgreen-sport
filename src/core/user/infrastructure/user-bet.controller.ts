/* eslint-disable prettier/prettier */
import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/common/guards/auth.guard';
import { BetBulkDto } from './dto/bet-bulk.dto';
import { UserBetService } from '../application/user-bet.service';
import { GetUser } from 'src/core/common/decorators/get-user.decorator';
import { User } from '../domain/user.entity';
import { RolesGuard } from 'src/core/common/guards/roles.guard';

@Controller('user-bet')
@ApiTags('User-Bet')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard, RolesGuard)
export class UserBetController {
  constructor(private readonly userBetService: UserBetService) {}

  @Post('user-bet')
  create(@Body() createUserDto: BetBulkDto, @GetUser() user: User) {
    return this.userBetService.processBets(createUserDto, user);
  }
}
