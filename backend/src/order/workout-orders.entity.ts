import { Entity } from '@app/core';
import { WorkoutOrders } from '@app/types';
import { WorkoutEntity } from 'src/workout/workout.entity';

export class WorkoutOrdersEntity implements WorkoutOrders, Entity<string> {
  public count: number;
  public sum: number;
  public workout: WorkoutEntity;

  constructor(Order: WorkoutOrders) {
    this.populate(Order);
  }

  public toPOJO() {
    return {
      count: this.count,
      sum: this.sum,
      workout: this.workout.toPOJO(),
    };
  }

  public populate(data: WorkoutOrders): void {
    this.count = data.count;
    this.sum = data.sum;
    this.workout = WorkoutEntity.fromObject(data.workout);
  }

  static fromObject(data: WorkoutOrders): WorkoutOrdersEntity {
    return new WorkoutOrdersEntity(data);
  }
}
