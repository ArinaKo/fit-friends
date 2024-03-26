import { DtoValidationMessage } from '@app/messages';
import { UserLevel, WorkoutDuration, WorkoutSexFor, WorkoutType } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEnum,
  Length,
  IsNumber,
  Min,
  Max,
  IsMongoId,
} from 'class-validator';
import { CaloriesValue, PriceValue, WorkoutDescriptionLength, WorkoutTitleLength } from 'src/const';

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Workout  title',
    example: 'hatha',
  })
  @IsString()
  @Length(WorkoutTitleLength.Min, WorkoutTitleLength.Max, {
    message: DtoValidationMessage.workoutTitle.length,
  })
  public title: string;

  @ApiProperty({
    description: 'Workout background image',
    example: 'image.jpg',
  })
  @IsString()
  public backgroundImage: string;

  @ApiProperty({
    description: 'Workout level',
    example: 'любитель',
  })
  @IsEnum(UserLevel, { message: DtoValidationMessage.level.invalidFormat })
  public level: UserLevel;

  @ApiProperty({
    description: 'Workout type',
    example: 'йога',
  })
  @IsEnum(WorkoutType, {
    message: DtoValidationMessage.workoutsTypes.invalidItems,
  })
  public type: WorkoutType;

  @ApiProperty({
    description: 'Workout duration',
    example: '30-50 мин',
  })
  @IsEnum(WorkoutDuration, {
    message: DtoValidationMessage.timeForWorkout.invalidFormat,
  })
  public duration: WorkoutDuration;

  @ApiProperty({
    description: 'Workout price',
    example: '5500',
  })
  @IsNumber()
  @Min(PriceValue.Min, { message: DtoValidationMessage.price.value })
  public price: number;

  @ApiProperty({
    description: 'Workout`s calories loss',
    example: '2300',
  })
  @IsNumber()
  @Min(CaloriesValue.Min, { message: DtoValidationMessage.calories.value })
  @Max(CaloriesValue.Max, { message: DtoValidationMessage.calories.value })
  public calories: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'Упражнения по хатха йоге, направленные на понижение нервной возбудимости.',
  })
  @IsString()
  @Length(WorkoutDescriptionLength.Min, WorkoutDescriptionLength.Max, {
    message: DtoValidationMessage.workoutDescription.length,
  })
  public description: string;

  @ApiProperty({
    description: 'Workout`s user sex',
    example: 'женский',
  })
  @IsEnum(WorkoutSexFor, { message: DtoValidationMessage.workoutSexFor.invalidFormat })
  public userSex: WorkoutSexFor;

  @ApiProperty({
    description: 'Workout video',
    example: 'video.mov',
  })
  @IsString()
  public video: string;

  @ApiProperty({
    description: 'Workout`s coach id',
    example: '65fb2224ddbac789d3321447',
  })
  @IsMongoId()
  public coachId: string;

  @ApiProperty({
    description: 'Workout`s special offer flag',
    example: 'true',
  })
  @IsBoolean()
  public isSpecial: boolean;
}
