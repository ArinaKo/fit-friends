import { IsEnum, IsInt, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection } from '@app/types';
import { LIST_LIMIT } from 'src/shared/const';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseQuery {
  @ApiPropertyOptional({
    description: 'List limit',
    example: '5',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Max(LIST_LIMIT)
  @IsOptional()
  public limit?: number;

  @ApiPropertyOptional({
    description: 'Sort direction',
    example: '-1',
  })
  @Transform(({ value }) => +value)
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection;

  @ApiPropertyOptional({
    description: 'Page number',
    example: '2',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public page?: number;
}
