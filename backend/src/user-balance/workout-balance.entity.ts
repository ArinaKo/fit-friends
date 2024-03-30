import { Entity } from '@app/core';
import { Balance } from '@app/types';
import { WorkoutEntity } from 'src/workout/workout.entity';

export class WorkoutBalanceEntity implements Balance, Entity<string> {
  public userId?: string;
  public count: number;
  public workout: WorkoutEntity;

  constructor(data: Balance) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      userId: this.userId,
      count: this.count,
      workout: this.workout.toPOJO(),
    };
  }

  public populate(data: Balance): void {
    this.userId = data.userId;
    this.count = data.count;
    this.workout = WorkoutEntity.fromObject(data.workout);
  }

  static fromObject(data: Balance): WorkoutBalanceEntity {
    return new WorkoutBalanceEntity(data);
  }
}
