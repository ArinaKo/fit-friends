import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WorkoutType } from '@app/types';
import * as lodash from 'lodash';
import { BaseWorkoutsQuery } from './base-workouts.query';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { WorkoutsPriceSorting } from '../workout.const';

export class WorkoutsQuery extends BaseWorkoutsQuery {
  @ApiPropertyOptional({
    description: 'Workouts types',
    example: 'йога, бег',
  })
  @Transform(({ value }) => {
    const types = typeof value === 'string' ? [value] : value;
    return types.map((item: string) => lodash.lowerCase(item));
  })
  @IsIn(Object.values(WorkoutType), { each: true })
  @IsOptional()
  public workoutTypes?: string[];

  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(WorkoutsPriceSorting)
  @IsOptional()
  public sorting?: WorkoutsPriceSorting;
}
