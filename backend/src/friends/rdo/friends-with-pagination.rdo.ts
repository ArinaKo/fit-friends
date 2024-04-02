import { Expose } from 'class-transformer';
import { FriendRdo } from './friend.rdo';
import { BasePaginationRdo } from '@app/core';

export class FriendsWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public friends: FriendRdo[];
}
