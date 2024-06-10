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
  create(@Body() createBetDto: CreateBetDto, @GetUser() user: User) {
    return this.betService.create(createBetDto, user);
  }

  @Post('settler')
  @ApiOperation({
    description:
      'here it is possible to settle bets instead of the id of the events and the winning bet option',
    summary: 'Settler bet endpoint',
  })
  settler(@Body() settlerDto: SettlerDto, @GetUser() user: User) {
    return this.betSettlerService.betSettlerChange(
      settlerDto.eventIds,
      settlerDto.betOptionWin,
      user,
    );
  }

  @Post('search')
  findAll(@Body() searchDto: SearchDto) {
    return this.betService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betService.findOne(+id);
  }

  @Patch(':id')
  Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBetDto: UpdateBetDto,
    @GetUser() user,
  ) {
    return this.betService.update(id, updateBetDto, user);
  }
}
