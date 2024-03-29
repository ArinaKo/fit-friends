import { IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { BaseQuery } from "src/query/base.query";
import { SortingType } from "../orders.const";
import * as lodash from 'lodash';

export class WorkoutsOrdersQuery extends BaseQuery {
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(SortingType)
  @IsOptional()
  public sortingType?: SortingType;
}