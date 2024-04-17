import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@app/types';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User role',
    example: 'пользователь',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Access token',
  })
  @Expose()
  public accessToken?: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  @Expose()
  public refreshToken?: string;
}
