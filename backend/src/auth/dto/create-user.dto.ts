import { MetroStation, UserRole, UserSex } from '@app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsEnum,
  Length,
  IsOptional,
  IsISO8601,
  Matches,
} from 'class-validator';
import { UserNameLength, UserPasswordLength } from 'src/shared/const';
import { DtoValidationMessage } from 'src/shared/messages';
import { Expose, Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'User avatar',
  })
  @Expose()
  public avatar: File;

  @ApiPropertyOptional({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601()
  @IsOptional()
  @Expose()
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Matches(/^[a-zа-яё]+$/i)
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: DtoValidationMessage.password.length,
  })
  @Expose()
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserRole, { message: DtoValidationMessage.role.invalidFormat })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User sex',
    example: 'мужской',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(UserSex, { message: DtoValidationMessage.sex.invalidFormat })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'User location - metro station',
    example: 'Пионерская',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(MetroStation, {
    message: DtoValidationMessage.location.invalidFormat,
  })
  @Expose()
  public location: MetroStation;
}
