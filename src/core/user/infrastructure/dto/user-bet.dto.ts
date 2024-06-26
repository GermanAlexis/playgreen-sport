import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsEnum, IsNotEmpty } from 'class-validator';
import { UserBetState } from '../../enums/state-user.enum';

export class UserBetDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'Bet Id',
    example: 1,
    name: 'betId',
  })
  betId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'option selected possible Bet winner',
    example: 1,
    name: 'optionSelected',
  })
  optionSelected: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @ApiProperty({
    type: Number,
    name: 'amount',
    example: 1000.0,
    description: 'amount dish',
  })
  amount: number;

  @IsEnum(UserBetState)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Status bet',
    example: UserBetState.OPEN,
    name: 'status',
  })
  state: UserBetState = UserBetState.OPEN;
}
