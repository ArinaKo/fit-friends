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
  IsDate,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import {
  CaloriesValue,
  MAX_WORKOUTS_TYPES,
  UserAchievementsLength,
  UserDescriptionLength,
  UserNameLength,
  UserPasswordLength,
} from 'src/const';
import { UserValidationMessage } from './user-validation.messages';

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
  @IsDate()
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: UserValidationMessage.name.length,
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserValidationMessage.password.length,
  })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  @IsEnum(UserRole, { message: UserValidationMessage.role.invalidFormat })
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  @IsEnum(UserSex, { message: UserValidationMessage.sex.invalidFormat })
  public sex: UserSex;

  @ApiProperty({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
  @IsString()
  @Length(UserDescriptionLength.Min, UserDescriptionLength.Max, {
    message: UserValidationMessage.description.length,
  })
  public description: string;

  @ApiProperty({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  @IsEnum(MetroStation, {
    message: UserValidationMessage.location.invalidFormat,
  })
  public location: MetroStation;

  @ApiPropertyOptional({
    description: 'User image for background',
    example: 'background-image.png',
  })
  @IsString()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @IsEnum(UserLevel, { message: UserValidationMessage.level.invalidFormat })
  public level: UserLevel;

  @ApiProperty({
    description: 'User`s workouts types',
    example: 'йога, бег',
  })
  @IsArray()
  @ArrayMaxSize(MAX_WORKOUTS_TYPES, {
    message: UserValidationMessage.workoutsTypes.length,
  })
  @IsEnum(WorkoutType, {
    each: true,
    message: UserValidationMessage.workoutsTypes.invalidItems,
  })
  public workoutTypes: WorkoutType[];

  @ApiProperty({
    description: 'Is user ready for workout?',
    example: 'true',
  })
  @IsBoolean()
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
  @IsNumber()
  @Min(CaloriesValue.Min, { message: UserValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: UserValidationMessage.calories.value })
  public caloriesToLose: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: '1000',
  })
  @IsNumber()
  @Min(CaloriesValue.Min, { message: UserValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: UserValidationMessage.calories.value })
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User`s preferable workout duration',
    example: '10-30 мин',
  })
  @IsEnum(WorkoutDuration, {
    message: UserValidationMessage.timeForWorkout.invalidFormat,
  })
  public timeForWorkout: WorkoutDuration;
}

export class CreateCoachUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'Coach certificate',
    example: 'certificate.jpg',
  })
  @IsString()
  public certificate: string;

  @ApiProperty({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  @IsString()
  @Length(UserAchievementsLength.Min, UserAchievementsLength.Max, {
    message: UserValidationMessage.achievements.length,
  })
  public achievements: string;
}

export type CreateUserDto = CreateCoachUserDto | CreateDefaultUserDto;
