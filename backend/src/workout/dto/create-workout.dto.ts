import { UserLevel, UserSex, WorkoutDuration, WorkoutType } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Workout  title',
    example: 'hatha',
  })
  public title: string;

  @ApiProperty({
    description: 'Workout background image',
    example: 'image.jpg',
  })
  public backgroundImage: string;

  @ApiProperty({
    description: 'Workout level',
    example: 'любитель',
  })
  public level: UserLevel;

  @ApiProperty({
    description: 'Workout type',
    example: 'йога',
  })
  public type: WorkoutType;

  @ApiProperty({
    description: 'Workout duration',
    example: '30-50 мин',
  })
  public duration: WorkoutDuration;

  @ApiProperty({
    description: 'Workout price',
    example: '5500',
  })
  public price: number;

  @ApiProperty({
    description: 'Workout`s calories loss',
    example: '2300',
  })
  public calories: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'Упражнения по хатха йоге, направленные на понижение нервной возбудимости.',
  })
  public description: string;

  @ApiProperty({
    description: 'Workout`s user sex',
    example: 'женский',
  })
  public userSex: UserSex;

  @ApiProperty({
    description: 'Workout video',
    example: 'video.mov',
  })
  public video: string;

  @ApiProperty({
    description: 'Workout`s coach id',
    example: '65fb2224ddbac789d3321447',
  })
  public coachId: string;

  @ApiProperty({
    description: 'Workout`s special offer flag',
    example: 'true',
  })
  public isSpecial: boolean;
}
