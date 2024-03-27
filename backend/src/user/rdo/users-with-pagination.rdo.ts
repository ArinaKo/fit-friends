import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';
import { BasePaginationRdo } from '@app/core';

export class UsersWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public users: UserRdo[];
}
