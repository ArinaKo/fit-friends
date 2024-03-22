import { UserEntity } from "src/users/user.entity";

export interface RequestWithUser {
  user: UserEntity;
}
