import { Expose } from 'class-transformer';
import { FriendRdo } from './friend.rdo';
import { BasePaginationRdo } from '@app/core';
import { ApiProperty } from '@nestjs/swagger';

export class FriendsWithPaginationRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Friends list',
    type: [FriendRdo],
  })
  @Expose()
  public friends: FriendRdo[];
}
