import { BasePaginationRdo } from '@app/core';
import { Expose } from 'class-transformer';
import { UserRdo } from 'src/user/rdo';

export class FriendsWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public friends: UserRdo[];
}
