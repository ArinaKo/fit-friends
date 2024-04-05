import { Entity } from '@app/core';
import { Subscriber } from '@app/types';

export class SubscriberEntity implements Subscriber, Entity<string> {
  public id?: string;
  public userId: string;
  public coaches: string[];
  public newWorkouts: string[];

  constructor(data: Subscriber) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      coaches: this.coaches,
      newWorkouts: this.newWorkouts,
    };
  }

  public populate(data: Subscriber): void {
    this.id = data.id;
    this.userId = data.userId;
    this.coaches = data.coaches;
    this.newWorkouts = data.newWorkouts;
  }

  static fromObject(data: Subscriber): SubscriberEntity {
    return new SubscriberEntity(data);
  }
}
