import { Entity } from '@app/core';
import { UserBalance } from '@app/types';
import { BalanceEntity } from './balance.entity';

export class UserBalanceEntity implements Entity<string> {
  public userId?: string;
  public balances: BalanceEntity[];

  constructor(data: UserBalance) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      userId: this.userId,
      workoutsBalance: this.balances.map((balance) => balance.toPOJO()),
    };
  }

  public populate(data: UserBalance): void {
    this.userId = data.userId;
    this.balances = data.balances.map((balance) =>
      BalanceEntity.fromObject(balance),
    );
  }

  static fromObject(data: UserBalance): UserBalanceEntity {
    return new UserBalanceEntity(data);
  }
}
