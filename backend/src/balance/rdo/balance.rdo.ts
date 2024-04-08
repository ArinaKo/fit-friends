import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { WorkoutRdo } from 'src/workout/rdo';

export class BalanceRdo {
  @ApiProperty({
    description: 'Workout orders count',
    example: '2',
  })
  @Expose()
  public count: number;

  @ApiProperty({
    description: 'Workout',
  })
  @Expose()
  public workout: WorkoutRdo;
}
