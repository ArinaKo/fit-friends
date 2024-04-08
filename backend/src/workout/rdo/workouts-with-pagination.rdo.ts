import { Expose } from 'class-transformer';
import { WorkoutRdo } from './workout.rdo';
import { BasePaginationRdo } from '@app/core';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutsWithPaginationRdo extends BasePaginationRdo {
  @ApiPropertyOptional({
    description: 'Workouts list',
    type: [WorkoutRdo],
  })
  @Expose()
  public workouts: WorkoutRdo[];
}
