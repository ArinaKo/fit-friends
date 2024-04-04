import { Entity } from '@app/core';
import { CoachSubscription, Subscriber } from '@app/types';

export class SubscriptionEntity implements CoachSubscription, Entity<string> {
  public id?: string;
  public coachId: string;
  public subscriber: Subscriber;

  constructor(data: CoachSubscription) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      coachId: this.coachId,
      subscriber: {
        id: this.id,
        userId: this.subscriber.userId,
        email: this.subscriber.email,
      },
    };
  }

  public populate(data: CoachSubscription): void {
    this.id = data.id;
    this.coachId = data.coachId;
    this.subscriber.email = data.subscriber.email;
    this.subscriber.userId = data.subscriber.userId;
  }

  static fromObject(data: CoachSubscription): SubscriptionEntity {
    return new SubscriptionEntity(data);
  }
}
