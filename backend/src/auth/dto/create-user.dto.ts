import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
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
  UserPasswordLength,
} from 'src/shared/const';
import { DtoValidationMessage } from 'src/shared/messages';
import { Expose, Transform } from 'class-transformer';

class BaseUserDto {
  @ApiProperty({
    description: 'User avatar',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  @Expose()
  public avatar: string;

  @ApiPropertyOptional({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601()
  @IsOptional()
  @Expose()
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Matches(/^[a-zа-яё]+$/i)
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: DtoValidationMessage.password.length,
  })
  @Expose()
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserRole, { message: DtoValidationMessage.role.invalidFormat })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserSex, { message: DtoValidationMessage.sex.invalidFormat })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(UserDescriptionLength.Min, UserDescriptionLength.Max, {
    message: DtoValidationMessage.userDescription.length,
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(MetroStation, {
    message: DtoValidationMessage.location.invalidFormat,
  })
  @Expose()
  public location: MetroStation;

  @ApiPropertyOptional({
    description: 'User image for background',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  @IsOptional()
  @Expose()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
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

  @ApiProperty({
    description: 'Is user ready for workout?',
    example: 'true',
  })
  @IsBoolean()
  @Expose()
  public isReady: boolean;
}

export class CreateDefaultUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'Calories to lose',
    example: '3200',
  })
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesToLose: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: '1000',
  })
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User`s preferable workout duration',
    example: '10-30 мин',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  @Expose()
  public timeForWorkout: WorkoutDuration;
}

export class CreateCoachUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'Coach certificate',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  @Expose()
  public certificate: string;

  @ApiProperty({
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

export type CreateUserDto = CreateCoachUserDto | CreateDefaultUserDto;
