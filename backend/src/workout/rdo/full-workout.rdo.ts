import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from 'src/user/rdo';
import { WorkoutRdo } from './workout.rdo';
import { FileRdo } from 'src/file-vault/rdo';

export class FullWorkoutRdo extends WorkoutRdo {
  @ApiProperty({
    description: 'Workout video',
    example: 'video.mov',
  })
  @Type(() => FileRdo)
  @Expose()
  public video: FileRdo;

  @ApiProperty({
    description: 'Workout`s coach',
  })
  @Type(() => UserRdo)
  @Expose()
  public coach: UserRdo;
}
