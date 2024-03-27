import { Expose } from 'class-transformer';
import { WorkoutRdo } from './workout.rdo';
import { BasePaginationRdo } from '@app/core';

export class WorkoutsWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public workouts: WorkoutRdo[];
}
