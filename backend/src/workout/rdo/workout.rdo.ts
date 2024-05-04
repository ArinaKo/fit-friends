import {
  UserLevel,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WorkoutRdo {
  @ApiProperty({
    description: 'The uniq workout ID',
    example: '65fb2224ddbac789d3321447',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Workout  title',
    example: 'hatha',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Workout background image',
    example: 'image.jpg',
  })
  @Expose()
  public backgroundImage: string;

  @ApiProperty({
    description: 'Workout level',
    example: 'любитель',
  })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'Workout type',
    example: 'йога',
  })
  @Expose()
  public type: WorkoutType;

  @ApiProperty({
    description: 'Workout duration',
    example: '30-50',
  })
  @Expose()
  public duration: WorkoutDuration;

  @ApiProperty({
    description: 'Workout price',
    example: '5500',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Workout`s calories loss',
    example: '2300',
  })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Workout description',
    example:
      'Упражнения по хатха йоге, направленные на понижение нервной возбудимости.',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Workout`s user sex',
    example: 'женский',
  })
  @Expose()
  public userSex: WorkoutSexFor;

  @ApiProperty({
    description: 'Workout`s coach id',
    example: '65fb2224ddbac789d3321447',
  })
  @Expose()
  public coachId: string;

  @ApiProperty({
    description: 'Workout`s special offer flag',
    example: 'true',
  })
  @Expose()
  public isSpecial: boolean;

  @ApiProperty({
    description: 'Workout rating',
    example: '5',
  })
  @Expose()
  public rating: number;
}
