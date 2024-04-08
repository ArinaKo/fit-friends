import { UserEntity } from 'src/user/user.entity';

export interface RequestWithUser {
  user: UserEntity;
}
