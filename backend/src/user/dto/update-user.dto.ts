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
} from 'class-validator';
import {
  CaloriesValue,
  MAX_WORKOUTS_TYPES,
  UserAchievementsLength,
  UserDescriptionLength,
  UserNameLength,
} from 'src/shared/const';
import { DtoValidationMessage } from 'src/shared/messages';
import { Expose } from 'class-transformer';

class BaseUserDto {
  @ApiPropertyOptional({
    description: 'User avatar url',
    example: 'image.jpg',
  })
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
  @IsOptional()
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Expose()
  public name?: string;

  @ApiPropertyOptional({
    description: 'User sex',
    example: 'мужской',
  })
  @IsOptional()
  @IsEnum(UserSex, { message: DtoValidationMessage.sex.invalidFormat })
  @Expose()
  public sex?: UserSex;

  @ApiPropertyOptional({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
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
  @IsOptional()
  @IsEnum(MetroStation, {
    message: DtoValidationMessage.location.invalidFormat,
  })
  @Expose()
  public location?: MetroStation;

  @ApiPropertyOptional({
    description: 'User image for background',
    example: 'background-image.png',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public backgroundImage?: string;

  @ApiPropertyOptional({
    description: 'User level',
    example: 'новичок',
  })
  @IsOptional()
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level?: UserLevel;

  @ApiPropertyOptional({
    description: 'User`s workouts types',
    example: 'йога, бег',
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
    description: 'Coach certificate',
    example: 'certificate.jpg',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public certificate?: string;

  @ApiPropertyOptional({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  @IsOptional()
  @IsString()
  @Length(UserAchievementsLength.Min, UserAchievementsLength.Max, {
    message: DtoValidationMessage.achievements.length,
  })
  @Expose()
  public achievements?: string;
}

export type UpdateUserDto = UpdateCoachUserDto | UpdateDefaultUserDto;
