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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchDto } from './dto/search-bet.dto';
import { GetUser } from 'src/core/common/decorators/get-user.decorator';
import { User } from 'src/core/user/domain/user.entity';
import { AuthGuard } from 'src/core/common/guards/auth.guard';
import { UpdateBetDto } from './dto/update-bet.dto';

@ApiTags('Bets')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post()
  create(@Body() createBetDto: CreateBetDto, @GetUser() user: User) {
    return this.betService.create(createBetDto, user);
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
