import { DtoValidationMessage } from 'src/shared/messages';
import {
  UserLevel,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, Length, IsInt, Min, Max } from 'class-validator';
import {
  CaloriesValue,
  PriceValue,
  WorkoutDescriptionLength,
  WorkoutTitleLength,
} from 'src/shared/const';
import { Transform } from 'class-transformer';

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Workout  title',
    example: 'hatha',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(WorkoutTitleLength.Min, WorkoutTitleLength.Max, {
    message: DtoValidationMessage.workoutTitle.length,
  })
  public title: string;

  @ApiProperty({
    description: 'Workout level',
    example: 'любитель',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  public level: UserLevel;

  @ApiProperty({
    description: 'Workout type',
    example: 'йога',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(WorkoutType, {
    message: DtoValidationMessage.workoutsTypes.invalidItems,
  })
  public type: WorkoutType;

  @ApiProperty({
    description: 'Workout duration',
    example: '30-50',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  public duration: WorkoutDuration;

  @ApiProperty({
    description: 'Workout price',
    example: '5500',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(PriceValue.Min, { message: DtoValidationMessage.price.value })
  public price: number;

  @ApiProperty({
    description: 'Workout`s calories loss',
    example: '2300',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  public calories: number;

  @ApiProperty({
    description: 'Workout description',
    example:
      'Упражнения по хатха йоге, направленные на понижение нервной возбудимости.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(WorkoutDescriptionLength.Min, WorkoutDescriptionLength.Max, {
    message: DtoValidationMessage.workoutDescription.length,
  })
  public description: string;

  @ApiProperty({
    description: 'Workout`s user sex',
    example: 'для женщин',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(WorkoutSexFor, {
    message: DtoValidationMessage.workoutSexFor.invalidFormat,
  })
  public userSex: WorkoutSexFor;

  @ApiProperty({
    description: 'Workout video file',
  })
  public video: File;
}
