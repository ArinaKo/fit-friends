import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WorkoutRdo } from 'src/workout/rdo';

export class WorkoutOrdersRdo {
  @ApiProperty({
    description: 'Workout',
    type: WorkoutRdo,
  })
  @Type(() => WorkoutRdo)
  @Expose()
  public workout: WorkoutRdo;

  @ApiProperty({
    description: 'Workout orders count',
    example: '2',
  })
  @Expose()
  public count: number;

  @ApiProperty({
    description: 'Workout sales amount',
    example: '5000',
  })
  @Expose()
  public sum: number;
}
