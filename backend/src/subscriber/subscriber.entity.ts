import { Entity } from '@app/core';
import { Subscriber, WorkoutNotification } from '@app/types';

export class SubscriberEntity implements Subscriber, Entity<string> {
  public id?: string;
  public userId: string;
  public coaches: string[];
  public notifications: WorkoutNotification[];

  constructor(data: Subscriber) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      coaches: this.coaches,
      notifications: this.notifications,
    };
  }

  public populate(data: Subscriber): void {
    this.id = data.id;
    this.userId = data.userId;
    this.coaches = data.coaches;
    this.notifications = data.notifications;
  }

  static fromObject(data: Subscriber): SubscriberEntity {
    return new SubscriberEntity(data);
  }
}
