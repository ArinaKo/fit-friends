import { MetroStation, UserLevel, WorkoutType } from '@app/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  Length,
  IsOptional,
  Matches,
} from 'class-validator';
import {
  MAX_WORKOUTS_TYPES,
  UserDescriptionLength,
  UserNameLength,
} from 'src/shared/const';
import { DtoValidationMessage } from 'src/shared/messages';
import { Expose, Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User avatar',
  })
  @IsOptional()
  @Expose()
  public avatar?: File | null;

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
