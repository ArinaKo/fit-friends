import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from 'src/user/rdo';

export class CommentRdo {
  @ApiProperty({
    description: 'Workout`s coach',
    type: UserRdo,
  })
  @Type(() => UserRdo)
  @Expose()
  public user: UserRdo;

  @ApiProperty({
    description: 'Comment id',
    example: '660306ae5cdc417b17500345',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Workout id',
    example: '660306ae5cdc417b17500eec',
  })
  @Expose()
  public workoutId: string;

  @ApiProperty({
    description: 'Workout rating',
    example: '4',
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Хорошая тренировка, понравилось',
  })
  @Expose()
  public text: string;
}
