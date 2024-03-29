import { Entity } from '@app/core';
import { WorkoutOrders } from '@app/types';
import { WorkoutEntity } from 'src/workout/workout.entity';

export class WorkoutOrdersEntity implements WorkoutOrders, Entity<string> {
  public totalCount: number;
  public totalSum: number;
  public workout: WorkoutEntity;

  constructor(Order: WorkoutOrders) {
    this.populate(Order);
  }

  public toPOJO() {
    return {
      totalCount: this.totalCount,
      totalSum: this.totalSum,
      workout: this.workout.toPOJO(),
    };
  }

  public populate(data: WorkoutOrders): void {
    this.totalCount = data.totalCount;
    this.totalSum = data.totalSum;
    this.workout = WorkoutEntity.fromObject(data.workout);
  }

  static fromObject(data: WorkoutOrders): WorkoutOrdersEntity {
    return new WorkoutOrdersEntity(data);
  }
}
