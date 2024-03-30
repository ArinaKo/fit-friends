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
  IsNumber,
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

export class UpdateWorkoutDto {
  @ApiPropertyOptional({
    description: 'Workout  title',
    example: 'hatha',
  })
  @IsOptional()
  @IsString()
  @Length(WorkoutTitleLength.Min, WorkoutTitleLength.Max, {
    message: DtoValidationMessage.workoutTitle.length,
  })
  public title?: string;

  @ApiPropertyOptional({
    description: 'Workout background image',
    example: 'image.jpg',
  })
  @IsOptional()
  @IsString()
  public backgroundImage?: string;

  @ApiPropertyOptional({
    description: 'Workout level',
    example: 'любитель',
  })
  @IsOptional()
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  public level?: UserLevel;

  @ApiPropertyOptional({
    description: 'Workout type',
    example: 'йога',
  })
  @IsOptional()
  @IsEnum(WorkoutType, {
    message: DtoValidationMessage.workoutsTypes.invalidItems,
  })
  public type?: WorkoutType;

  @ApiPropertyOptional({
    description: 'Workout duration',
    example: '30-50 мин',
  })
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
  @IsNumber()
  @Min(PriceValue.Min, { message: DtoValidationMessage.price.value })
  public price?: number;

  @ApiPropertyOptional({
    description: 'Workout`s calories loss',
    example: '2300',
  })
  @IsOptional()
  @IsNumber()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  public calories?: number;

  @ApiPropertyOptional({
    description: 'Workout description',
    example:
      'Упражнения по хатха йоге, направленные на понижение нервной возбудимости.',
  })
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
  @IsOptional()
  @IsEnum(WorkoutSexFor, {
    message: DtoValidationMessage.workoutSexFor.invalidFormat,
  })
  public userSex?: WorkoutSexFor;

  @ApiPropertyOptional({
    description: 'Workout video',
    example: 'video.mov',
  })
  @IsOptional()
  @IsString()
  public video?: string;

  @ApiPropertyOptional({
    description: 'Workout`s special offer flag',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  public isSpecial?: boolean;
}
