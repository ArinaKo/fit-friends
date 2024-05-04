import { IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WorkoutDuration } from '@app/types';
import { BaseWorkoutsQuery } from './base-workouts.query';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CoachWorkoutsQuery extends BaseWorkoutsQuery {
  @ApiPropertyOptional({
    description: 'Workouts durations',
    example: '10-30, 30-50',
  })
  @IsIn(Object.values(WorkoutDuration), {
    each: true,
    message: `Field value must be from options: ${Object.values(WorkoutDuration).join(', ')}`,
  })
  @Transform(({ value }) => {
    return typeof value === 'string' ? [value] : value;
  })
  @IsOptional()
  public workoutDurations?: string[];
}
