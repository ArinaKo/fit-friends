import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'image.jpg',
  })
  @Expose()
  public avatar: string;

  @ApiPropertyOptional({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @Expose()
  public dateOfBirth?: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  @Expose()
  public location: MetroStation;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'User`s workouts types',
    example: 'йога, бег',
  })
  @Expose()
  public workoutTypes: WorkoutType[];

  @ApiProperty({
    description: 'Is user ready for workout?',
    example: 'true',
  })
  @Expose()
  public isReady: boolean;

  @ApiProperty({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'User image for background',
    example: 'background-image.png',
  })
  @Expose()
  public backgroundImage: string;

  @ApiPropertyOptional({
    description: 'Coach certificate',
    example: 'certificate.jpg',
  })
  @Expose()
  public certificate?: string;
}

export class FullUserRdo extends UserRdo {
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
