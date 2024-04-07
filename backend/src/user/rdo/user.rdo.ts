import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
} from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileRdo } from 'src/file-vault/rdo';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'image.jpg',
  })
  @Type(() => FileRdo)
  @Expose()
  public avatar: FileRdo;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  @Expose()
  public location: MetroStation;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'User`s workouts types',
    example: 'йога, бег',
  })
  @Expose()
  public workoutTypes: WorkoutType[];

  @ApiProperty({
    description: 'Is user ready for workout?',
    example: 'true',
  })
  @Expose()
  public isReady: boolean;
}
