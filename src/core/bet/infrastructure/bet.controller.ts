/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { BetService } from '../application/bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDto } from './dto/search-bet.dto';
import { GetUser } from 'src/core/common/decorators/get-user.decorator';
import { User } from 'src/core/user/domain/user.entity';
import { AuthGuard } from 'src/core/common/guards/auth.guard';
import { UpdateBetDto } from './dto/update-bet.dto';
import { BetSettlerService } from '../application/bet-settler.service';
import { SettlerDto } from './dto/settler.dto';

@ApiTags('Bets')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('bet')
export class BetController {
  constructor(
    private readonly betService: BetService,
    private readonly betSettlerService: BetSettlerService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Bet',
    description:
      'Create a new bet by specifying the event and the winning bet option.',
  })
  create(@Body() createBetDto: CreateBetDto, @GetUser() user: User) {
    return this.betService.create(createBetDto, user);
  }

  @Post('settler')
  @ApiOperation({
    summary: 'Settle Bet',
    description:
      'Settle bets for the specified events and set the winning bet option.',
  })
  settler(@Body() settlerDto: SettlerDto, @GetUser() user: User) {
    return this.betSettlerService.betSettlerChange(
      settlerDto.eventIds,
      settlerDto.betOptionWin,
      user,
    );
  }

  @Post('search')
  @ApiOperation({
    summary: 'Search Bets',
    description:
      'Search and filter bets based on the criteria provided in the request body.',
  })
  findAll(@Body() searchDto: SearchDto) {
    return this.betService.findAll(searchDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Bet by ID',
    description: 'Get the details of a specific bet by its unique identifier.',
  })
  findOne(@Param('id') id: string) {
    return this.betService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Bet',
    description: 'Update the details of an existing bet identified by its ID.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBetDto: UpdateBetDto,
    @GetUser() user,
  ) {
    return this.betService.update(id, updateBetDto, user);
  }
}
