import { Expose } from 'class-transformer';
import { UserRdo } from 'src/user/rdo';

export class FriendsListRdo {
  @Expose()
  public friends: UserRdo[];
}
