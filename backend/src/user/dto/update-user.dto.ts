import {
  MetroStation,
  UserLevel,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  Length,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsISO8601,
  IsMongoId,
  Matches,
} from 'class-validator';
import {
  CaloriesValue,
  MAX_WORKOUTS_TYPES,
  UserAchievementsLength,
  UserDescriptionLength,
  UserNameLength,
} from 'src/shared/const';
import { DtoValidationMessage } from 'src/shared/messages';
import { Expose, Transform } from 'class-transformer';

class BaseUserDto {
  @ApiPropertyOptional({
    description: 'User avatar file id',
    example: '65fb2c95e0f91e82a4d24b11',
  })
  @Transform(({ value }) => (value.trim() === 'string' ? value.trim() : value))
  @IsMongoId()
  @IsOptional()
  @Expose()
  public avatar?: string;

  @ApiPropertyOptional({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsOptional()
  @IsISO8601()
  @Expose()
  public dateOfBirth?: Date;

  @ApiPropertyOptional({
    description: 'User name',
    example: 'John',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Matches(/^[a-zа-яё]+$/i)
  @Expose()
  public name?: string;

  @ApiPropertyOptional({
    description: 'User sex',
    example: 'мужской',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(UserSex, { message: DtoValidationMessage.sex.invalidFormat })
  @Expose()
  public sex?: UserSex;

  @ApiPropertyOptional({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @Length(UserDescriptionLength.Min, UserDescriptionLength.Max, {
    message: DtoValidationMessage.userDescription.length,
  })
  @Expose()
  public description?: string;

  @ApiPropertyOptional({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(MetroStation, {
    message: DtoValidationMessage.location.invalidFormat,
  })
  @Expose()
  public location?: MetroStation;

  @ApiPropertyOptional({
    description: 'User image for background',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsMongoId()
  @Expose()
  public backgroundImage?: string;

  @ApiPropertyOptional({
    description: 'User level',
    example: 'новичок',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level?: UserLevel;

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
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_WORKOUTS_TYPES, {
    message: DtoValidationMessage.workoutsTypes.length,
  })
  @IsEnum(WorkoutType, {
    each: true,
    message: DtoValidationMessage.workoutsTypes.invalidItems,
  })
  @Expose()
  public workoutTypes?: WorkoutType[];

  @ApiPropertyOptional({
    description: 'Is user ready for workout?',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  public isReady?: boolean;
}

export class UpdateDefaultUserDto extends BaseUserDto {
  @ApiPropertyOptional({
    description: 'Calories to lose',
    example: '3200',
  })
  @IsOptional()
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesToLose?: number;

  @ApiPropertyOptional({
    description: 'Calories to lose per day',
    example: '1000',
  })
  @IsOptional()
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesPerDay?: number;

  @ApiPropertyOptional({
    description: 'User`s preferable workout duration',
    example: '10-30 мин',
  })
  @IsOptional()
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  @Expose()
  public timeForWorkout?: WorkoutDuration;
}

export class UpdateCoachUserDto extends BaseUserDto {
  @ApiPropertyOptional({
    description: 'Coach certificate file id',
    example: '65fb2c95e0f91e82a4d24b11',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  @IsOptional()
  @Expose()
  public certificate?: string;

  @ApiPropertyOptional({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @Length(UserAchievementsLength.Min, UserAchievementsLength.Max, {
    message: DtoValidationMessage.achievements.length,
  })
  @Expose()
  public achievements?: string;
}

export type UpdateUserDto = UpdateCoachUserDto | UpdateDefaultUserDto;
