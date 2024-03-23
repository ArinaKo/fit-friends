import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class FullUserRdo extends UserRdo {
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
