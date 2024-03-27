import { IsEnum, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection } from '@app/types';
import { LIST_LIMIT } from 'src/const';

export class BaseQuery {
  @Transform(({ value }) => +value)
  @IsNumber()
  @Max(LIST_LIMIT)
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;
}
