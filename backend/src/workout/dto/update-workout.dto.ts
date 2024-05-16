import { DtoValidationMessage } from 'src/shared/messages';
import {
  UserLevel,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '@app/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEnum,
  Length,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import {
  CaloriesValue,
  PriceValue,
  WorkoutDescriptionLength,
  WorkoutTitleLength,
} from 'src/shared/const';
import { Transform } from 'class-transformer';

export class UpdateWorkoutDto {
  @ApiPropertyOptional({
    description: 'Workout  title',
    example: 'hatha',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @Length(WorkoutTitleLength.Min, WorkoutTitleLength.Max, {
    message: DtoValidationMessage.workoutTitle.length,
  })
  public title?: string;

  @ApiPropertyOptional({
    description: 'Workout level',
    example: 'любитель',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  public level?: UserLevel;

  @ApiPropertyOptional({
    description: 'Workout type',
    example: 'йога',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(WorkoutType, {
    message: DtoValidationMessage.workoutsTypes.invalidItems,
  })
  public type?: WorkoutType;

  @ApiPropertyOptional({
    description: 'Workout duration',
    example: '30-50',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  public duration?: WorkoutDuration;

  @ApiPropertyOptional({
    description: 'Workout price',
    example: '5500',
  })
  @IsOptional()
  @IsInt()
  @Min(PriceValue.Min, { message: DtoValidationMessage.price.value })
  public price?: number;

  @ApiPropertyOptional({
    description: 'Workout`s calories loss',
    example: '2300',
  })
  @IsOptional()
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  public calories?: number;

  @ApiPropertyOptional({
    description: 'Workout description',
    example:
      'Упражнения по хатха йоге, направленные на понижение нервной возбудимости.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @Length(WorkoutDescriptionLength.Min, WorkoutDescriptionLength.Max, {
    message: DtoValidationMessage.workoutDescription.length,
  })
  public description?: string;

  @ApiPropertyOptional({
    description: 'Workout`s user sex',
    example: 'женский',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsEnum(WorkoutSexFor, {
    message: DtoValidationMessage.workoutSexFor.invalidFormat,
  })
  public userSex?: WorkoutSexFor;

  @ApiPropertyOptional({
    description: 'Workout`s special offer flag',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  public isSpecial?: boolean;
}
