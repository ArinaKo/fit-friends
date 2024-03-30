import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MetroStation, UserLevel, UserRole, WorkoutType } from '@app/types';
import { BaseQuery } from 'src/shared/query/base.query';
import * as lodash from 'lodash';

export class UsersQuery extends BaseQuery {
  @Transform(({ value }) => {
    const locations = typeof value === 'string' ? [value] : value;
    return locations.map((item: string) => lodash.lowerCase(item));
  })
  @IsIn(Object.values(WorkoutType), { each: true })
  @IsOptional()
  public workoutTypes?: string[];

  @Transform(({ value }) => {
    const locations = typeof value === 'string' ? [value] : value;
    return locations.map((item: string) => lodash.capitalize(item));
  })
  @IsIn(Object.values(MetroStation), { each: true })
  @IsOptional()
  public locations?: string[];

  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(UserLevel)
  @IsOptional()
  public level?: UserLevel;

  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;
}
