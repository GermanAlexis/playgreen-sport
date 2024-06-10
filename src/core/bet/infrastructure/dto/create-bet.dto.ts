import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { StatusBet } from '../../enums/status-bet.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBetDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'option possible in bet',
    example: 1,
    name: 'betOption',
  })
  betOption: 1 | 2 | 3;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'option possible sport name',
    example: 'Soccer',
    name: 'sport',
  })
  sport: string;

  @IsEnum(StatusBet)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Status bet',
    example: StatusBet.ACTIVE,
    name: 'status',
  })
  status: StatusBet = StatusBet.ACTIVE;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'team name',
    example: StatusBet.ACTIVE,
    name: 'name',
  })
  name: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'possible event id',
    example: 1,
    name: 'eventId',
  })
  eventId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'option possible quote bet',
    example: 1.2,
    name: 'odd',
  })
  odd: number;
}
