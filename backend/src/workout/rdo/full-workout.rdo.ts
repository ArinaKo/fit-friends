import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from 'src/user/rdo';
import { WorkoutRdo } from './workout.rdo';

export class FullWorkoutRdo extends WorkoutRdo {
  @ApiProperty({
    description: 'Workout video',
    example: 'video.mov',
  })
  @Expose()
  public video: string;

  @ApiProperty({
    description: 'Workout`s coach',
  })
  @Type(() => UserRdo)
  @Expose()
  public coach: UserRdo;
}
