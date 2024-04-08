import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from 'src/user/rdo';
import { WorkoutRequestRdo } from 'src/workout-request/rdo';

export class FriendRdo extends UserRdo {
  @ApiPropertyOptional({
    description: 'Workout request',
    type: [WorkoutRequestRdo],
  })
  @Expose()
  public workoutRequest: WorkoutRequestRdo;
}
