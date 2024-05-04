import { Expose } from 'class-transformer';
import { WorkoutRdo } from './workout.rdo';
import { BasePaginationRdo } from '@app/core';
import { ApiProperty } from '@nestjs/swagger';
import { FieldRange } from '@app/types';

export class WorkoutsWithPaginationRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Workouts list',
    type: [WorkoutRdo],
  })
  @Expose()
  public workouts: WorkoutRdo[];

  @ApiProperty({
    description: 'Workouts price range',
  })
  @Expose()
  public priceRange: FieldRange;

  @ApiProperty({
    description: 'Workouts price range',
  })
  @Expose()
  public caloriesRange: FieldRange;
}
