import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MetroStation, UserLevel, UserRole, WorkoutType } from '@app/types';
import { BaseQuery } from 'src/shared/query/base.query';
import * as lodash from 'lodash';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UsersQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Users workout types',
    example: 'йога, бег',
  })
  @Transform(({ value }) => {
    const types = typeof value === 'string' ? [value] : value;
    return types.map((item: string) => lodash.lowerCase(item));
  })
  @IsIn(Object.values(WorkoutType), { each: true })
  @IsOptional()
  public workoutTypes?: string[];

  @ApiPropertyOptional({
    description: 'Users locations',
    example: 'Пионерская, Звёздная',
  })
  @Transform(({ value }) => {
    const locations = typeof value === 'string' ? [value] : value;
    return locations.map((item: string) => lodash.capitalize(item));
  })
  @IsIn(Object.values(MetroStation), { each: true })
  @IsOptional()
  public locations?: string[];

  @ApiPropertyOptional({
    description: 'Users level',
    example: 'профессионал',
  })
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(UserLevel)
  @IsOptional()
  public level?: UserLevel;

  @ApiPropertyOptional({
    description: 'Users role',
    example: 'тренер',
  })
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;
}
