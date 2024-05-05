import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQuery } from 'src/shared/query/base.query';
import * as lodash from 'lodash';

export class UserBalanceQuery extends BaseQuery {
  @Transform(({ value }) => lodash.lowerCase(value) === 'true')
  @IsBoolean()
  @IsOptional()
  public active: boolean;
}
