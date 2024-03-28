import { Entity } from '@app/core';
import { Friends } from '@app/types';

export class FriendsEntity implements Entity<string> {
  public id?: string;
  public userId: string;
  public friendsList: string[];

  public populate(data: Friends): FriendsEntity {
    this.id = data.id;
    this.userId = data.userId;
    this.friendsList = data.friendsList

    return this;
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      friendsList: this.friendsList,
    };
  }

  static fromObject(data: Friends): FriendsEntity {
    return new FriendsEntity().populate(data);
  }
}
