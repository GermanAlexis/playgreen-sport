import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/core/common/dtos/pagination.dto';

export class SearchDto extends PaginationDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    type: Array,
    name: 'event',
    example: [1, 2, 3],
  })
  event: number[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    name: 'sport',
    example: 'Soccer',
  })
  sport: string;
}
