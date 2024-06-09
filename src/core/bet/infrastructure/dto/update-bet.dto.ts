import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBetDto } from './create-bet.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ResultBet } from '../../enums/status-bet.enum';

export class UpdateBetDto extends PartialType(CreateBetDto) {
  @IsEnum(ResultBet)
  @IsNotEmpty()
  @ApiProperty({
    description: 'option settled bet',
    example: ResultBet.LOST,
    name: 'result',
  })
  result: ResultBet;
}
