import { DefaultPojoType, Entity } from '@app/core';
import { Friends } from '@app/types';
import { UserEntity } from 'src/user/user.entity';

export class FriendsEntity implements Friends, Entity<string> {
  public id?: string;
  public userId: string;
  public friendsList: UserEntity[];

  public populate(data: Friends): FriendsEntity {
    this.id = data.id;
    this.userId = data.userId;
    this.friendsList = data.friendsList.map((user) =>
      UserEntity.fromObject(user),
    );

    return this;
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      friendsList: this.friendsList.map((userEntity) => userEntity.toPOJO()),
    };
  }

  static fromObject(data: Friends): FriendsEntity {
    return new FriendsEntity().populate(data);
  }
}
