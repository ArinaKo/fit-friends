import { Entity } from '@app/core';
import { Balance } from '@app/types';

export class BalanceEntity implements Balance, Entity<string> {
  public userId?: string;
  public count: number;
  public workoutId: string;

  constructor(data: Balance) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      userId: this.userId,
      count: this.count,
      workoutId: this.workoutId,
    };
  }

  public populate(data: Balance): void {
    this.userId = data.userId;
    this.count = data.count;
    this.workoutId = data.workoutId;
  }

  static fromObject(data: Balance): BalanceEntity {
    return new BalanceEntity(data);
  }
}
