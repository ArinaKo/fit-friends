import { Entity } from '@app/core';
import { UserBalance } from '@app/types';
import { WorkoutBalanceEntity } from './workout-balance.entity';

export class UserBalanceEntity implements Entity<string> {
  public userId?: string;
  public workoutsBalance: WorkoutBalanceEntity[];

  constructor(data: UserBalance) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      userId: this.userId,
      workoutsBalance: this.workoutsBalance.map((workoutBalance) =>
        workoutBalance.toPOJO(),
      ),
    };
  }

  public populate(data: UserBalance): void {
    this.userId = data.userId;
    this.workoutsBalance = data.workoutsBalance.map((workoutBalance) =>
      WorkoutBalanceEntity.fromObject(workoutBalance),
    );
  }

  static fromObject(data: UserBalance): UserBalanceEntity {
    return new UserBalanceEntity(data);
  }
}
