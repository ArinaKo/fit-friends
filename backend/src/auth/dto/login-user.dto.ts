import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { UserPasswordLength } from 'src/const';
import { DtoValidationMessage } from '@app/messages';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: DtoValidationMessage.password.length,
  })
  public password: string;
}
