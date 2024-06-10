import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class BalanceUserDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @ApiProperty({
    type: Number,
    name: 'amount',
    example: 1000.0,
    description: 'amount dish',
  })
  amount: number;
}
