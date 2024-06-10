import { ArrayMinSize, IsArray } from 'class-validator';
import { UserBetDto } from './user-bet.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BetBulkDto {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    type: Array,
    name: 'items',
    example: [{ odd: 1.2, betId: 1, amount: 1000, state: 'open' }],
    description: 'Could bet in bulk',
  })
  items: UserBetDto[];
}
