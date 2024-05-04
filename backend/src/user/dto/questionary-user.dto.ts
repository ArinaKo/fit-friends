import { UserLevel, WorkoutDuration, WorkoutType } from '@app/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  ArrayMaxSize,
  IsArray,
  IsEnum,
  Length,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import {
  CaloriesValue,
  MAX_WORKOUTS_TYPES,
  UserAchievementsLength,
} from 'src/shared/const';
import { DtoValidationMessage } from 'src/shared/messages';
import { Expose, Transform } from 'class-transformer';

class BaseQuestionaryDto {
  @ApiPropertyOptional({
    description: 'User level',
    example: 'новичок',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level: UserLevel;

  @ApiPropertyOptional({
    description: 'User`s workouts types',
    example: 'йога, бег',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value.trim()];
    }
    if (Array.isArray(value)) {
      return value.map((item) =>
        typeof item === 'string' ? item.trim() : item,
      );
    }
  })
  @IsArray()
  @ArrayMaxSize(MAX_WORKOUTS_TYPES, {
    message: DtoValidationMessage.workoutsTypes.length,
  })
  @IsEnum(WorkoutType, {
    each: true,
    message: DtoValidationMessage.workoutsTypes.invalidItems,
  })
  @Expose()
  public workoutTypes: WorkoutType[];
}

export class DefaultUserQuestionaryDto extends BaseQuestionaryDto {
  @ApiPropertyOptional({
    description: 'Calories to lose',
    example: '3200',
  })
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesToLose: number;

  @ApiPropertyOptional({
    description: 'Calories to lose per day',
    example: '1000',
  })
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesPerDay: number;

  @ApiPropertyOptional({
    description: 'User`s preferable workout duration',
    example: '10-30',
  })
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  @Expose()
  public timeForWorkout: WorkoutDuration;
}

export class CoachUserQuestionaryDto extends BaseQuestionaryDto {
  @ApiPropertyOptional({
    description: 'Coach certificates',
  })
  @Expose()
  public certificates: File | File[];

  @ApiPropertyOptional({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(UserAchievementsLength.Min, UserAchievementsLength.Max, {
    message: DtoValidationMessage.achievements.length,
  })
  @Expose()
  public achievements: string;
}
