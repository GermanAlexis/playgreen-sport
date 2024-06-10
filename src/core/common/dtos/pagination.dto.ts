import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    name: 'skip',
    example: 1,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  skip?: number;

  @ApiProperty({
    name: 'limit',
    example: 10,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
