import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
} from '@app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  @Expose()
  public avatar: string;

  @ApiPropertyOptional({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @Expose()
  public dateOfBirth?: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

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

  @ApiProperty({
    description: 'User description',
    example: 'Описание пользователя текстом',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'User image for background',
    example: 'background-image.png',
  })
  @Expose()
  public backgroundImage: string;

  @ApiPropertyOptional({
    description: 'Coach certificate',
    example: 'certificate.jpg',
  })
  @Expose()
  public certificate?: string;
}
