import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from './user.rdo';
import { FileRdo } from 'src/file-vault/rdo';

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
    type: FileRdo,
  })
  @Type(() => FileRdo)
  @Expose()
  public backgroundImage: FileRdo;

  @ApiPropertyOptional({
    description: 'Coach certificate',
    type: FileRdo,
  })
  @Type(() => FileRdo)
  @Expose()
  public certificate?: FileRdo;
}
