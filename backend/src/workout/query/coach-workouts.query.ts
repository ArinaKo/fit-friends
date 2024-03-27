import { IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WorkoutDuration } from '@app/types';
import * as lodash from 'lodash';
import { BaseWorkoutsQuery } from './base-workouts.query';

export class CoachWorkoutsQuery extends BaseWorkoutsQuery {
  @IsIn(Object.values(WorkoutDuration), { each: true, message: `Field value must be from options: ${(Object.keys(WorkoutDuration).join(', '))}` })
  @Transform(({ value }) => {
    const durations = typeof value === 'string' ? [value] : value;
    return durations.map((item: string) => WorkoutDuration[lodash.capitalize(item)]);
  })
  @IsOptional()
  public workoutDurations?: string[];
}
