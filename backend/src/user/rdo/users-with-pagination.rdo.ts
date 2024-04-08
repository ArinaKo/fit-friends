import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';
import { BasePaginationRdo } from '@app/core';
import { ApiProperty } from '@nestjs/swagger';

export class UsersWithPaginationRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Users list',
    type: [UserRdo],
  })
  @Expose()
  public users: UserRdo[];
}
