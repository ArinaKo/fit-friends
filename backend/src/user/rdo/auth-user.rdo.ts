import { WorkoutDuration } from '@app/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FullUserRdo } from 'src/user/rdo/index';

export class AuthUserRdo extends FullUserRdo {
  @ApiPropertyOptional({
    description: 'Calories to lose',
    example: '3200',
  })
  @Expose()
  public caloriesToLose?: number;

  @ApiPropertyOptional({
    description: 'Calories to lose per day',
    example: '1000',
  })
  @Expose()
  public caloriesPerDay?: number;

  @ApiPropertyOptional({
    description: 'User`s preferable workout duration',
    example: '10-30 мин',
  })
  @Expose()
  public timeForWorkout?: WorkoutDuration;

  @ApiPropertyOptional({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  @Expose()
  public achievements?: string;
}
