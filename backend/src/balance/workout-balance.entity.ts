import { Entity } from '@app/core';
import { WorkoutBalance } from '@app/types';
import { WorkoutEntity } from 'src/workout/workout.entity';

export class WorkoutBalanceEntity implements Entity<string> {
  public count: number;
  public workout: WorkoutEntity;

  constructor(Order: WorkoutBalance) {
    this.populate(Order);
  }

  public toPOJO() {
    return {
      count: this.count,
      workout: this.workout.toPOJO(),
    };
  }

  public populate(data: WorkoutBalance): void {
    this.count = data.count;
    this.workout = WorkoutEntity.fromObject(data.workout);
  }

  static fromObject(data: WorkoutBalance):  WorkoutBalanceEntity {
    return new  WorkoutBalanceEntity(data);
  }
}
