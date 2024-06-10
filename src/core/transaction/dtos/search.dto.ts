import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PaginationDto } from 'src/core/common/dtos/pagination.dto';
import { CategoriesTransaction } from '../enums/categories.enum';

export class SearchTransactionDto extends PaginationDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    type: Array,
    name: 'usersIds',
    example: [1, 2, 3],
  })
  usersIds: number[];

  @IsEnum(CategoriesTransaction)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'category',
    example: CategoriesTransaction.BET,
  })
  category: CategoriesTransaction;
}
