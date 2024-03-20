import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BaseUserDto {
  @ApiProperty({
    description: 'User avatar url',
    example: 'image.jpg',
  })
  public avatar: string;

  @ApiPropertyOptional({
    description: 'User birth date',
    example: '1981-03-12',
  })
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  public sex: UserSex;

  @ApiProperty({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
  public description: string;

  @ApiProperty({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  public location: MetroStation;

  @ApiPropertyOptional({
    description: 'User image for background',
    example: 'background-image.png',
  })
  public backgroundImage?: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  public level: UserLevel;

  @ApiProperty({
    description: 'User`s workouts types',
    example: 'йога, бег',
  })
  public workoutTypes: WorkoutType[];

  @ApiProperty({
    description: 'Is user ready for workout?',
    example: 'true',
  })
  public isReady: boolean;

  public certificate?: string;
  public achievements?: string;
  public caloriesToLose?: number;
  public caloriesPerDay?: number;
  public timeForWorkout?: WorkoutDuration;
}

export class CreateDefaultUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'Calories to lose',
    example: '3200',
  })
  public caloriesToLose: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: '1000',
  })
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User`s preferable workout duration',
    example: '10-30 мин',
  })
  public timeForWorkout: WorkoutDuration;
}

export class CreateCoachUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'Coach certificate',
    example: 'certificate.jpg',
  })
  public certificate: string;

  @ApiProperty({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  public achievements: string;
}

export type CreateUserDto = CreateCoachUserDto | CreateDefaultUserDto;
