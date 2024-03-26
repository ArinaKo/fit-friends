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
  IsNumber,
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
  UserPasswordLength,
} from 'src/const';
import { DtoValidationMessage } from '@app/messages';
import { Expose } from 'class-transformer';

class BaseUserDto {
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
  @IsISO8601()
  @IsOptional()
  @Expose()
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
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
  @IsEnum(UserRole, { message: DtoValidationMessage.role.invalidFormat })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  @IsEnum(UserSex, { message: DtoValidationMessage.sex.invalidFormat })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
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
  @IsEnum(MetroStation, {
    message: DtoValidationMessage.location.invalidFormat,
  })
  @Expose()
  public location: MetroStation;

  @ApiPropertyOptional({
    description: 'User image for background',
    example: 'background-image.png',
  })
  @IsString()
  @IsOptional()
  @Expose()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'User`s workouts types',
    example: 'йога, бег',
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
  @IsNumber()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesToLose: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: '1000',
  })
  @IsNumber()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User`s preferable workout duration',
    example: '10-30 мин',
  })
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  @Expose()
  public timeForWorkout: WorkoutDuration;
}

export class CreateCoachUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'Coach certificate',
    example: 'certificate.jpg',
  })
  @IsString()
  @Expose()
  public certificate: string;

  @ApiProperty({
    description: 'User`s achievements',
    example: 'Мой список достижений',
  })
  @IsString()
  @Length(UserAchievementsLength.Min, UserAchievementsLength.Max, {
    message: DtoValidationMessage.achievements.length,
  })
  @Expose()
  public achievements: string;
}

export type CreateUserDto = CreateCoachUserDto | CreateDefaultUserDto;
