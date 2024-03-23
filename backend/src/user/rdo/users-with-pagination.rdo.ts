import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class UsersWithPaginationRdo {
  @Expose()
  public users: UserRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
