import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNumber, IsPositive } from 'class-validator';

export class SettlerDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: Array,
    description: 'possible event id to settler',
    example: [1],
    name: 'eventIds',
  })
  eventIds: number[];

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'option winner in bet',
    example: 1,
    name: 'betOption',
  })
  betOptionWin: 1 | 2 | 3;
}
