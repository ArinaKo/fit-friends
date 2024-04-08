import { DtoValidationMessage } from 'src/shared/messages';
import {
  UserLevel,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEnum,
  Length,
  IsInt,
  Min,
  Max,
  IsMongoId,
} from 'class-validator';
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
    example: '30-50 мин',
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
  @IsInt()
  @Min(PriceValue.Min, { message: DtoValidationMessage.price.value })
  public price: number;

  @ApiProperty({
    description: 'Workout`s calories loss',
    example: '2300',
  })
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
    description: 'Workout video file id',
    example: '65fb2c95e0f91e82a4d24b11',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  public video: string;

  @ApiProperty({
    description: 'Workout`s special offer flag',
    example: 'true',
  })
  @IsBoolean()
  public isSpecial: boolean;
}
