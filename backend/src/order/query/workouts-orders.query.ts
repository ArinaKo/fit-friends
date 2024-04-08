import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQuery } from 'src/shared/query/base.query';
import { SortingType } from '../orders.const';
import * as lodash from 'lodash';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutsOrdersQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'sum',
  })
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(SortingType)
  @IsOptional()
  public sortingType?: SortingType;
}
