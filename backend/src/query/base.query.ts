import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection } from '@app/types';

export class BaseQuery {
  @Transform(({ value }) => +value)
  @IsNumber()
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
