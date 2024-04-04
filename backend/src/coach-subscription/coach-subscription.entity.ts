import { Entity } from '@app/core';
import { CoachSubscription } from '@app/types';

export class CoachSubscriptionEntity
  implements CoachSubscription, Entity<string>
{
  public id?: string;
  public coachId: string;
  public newWorkouts: string[];
  public subscribers: string[];

  constructor(data: CoachSubscription) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      coachId: this.coachId,
      newWorkouts: this.newWorkouts,
      subscribers: this.subscribers,
    };
  }

  public populate(data: CoachSubscription): void {
    this.id = data.id;
    this.coachId = data.coachId;
    this.newWorkouts = data.newWorkouts;
    this.subscribers = data.subscribers;
  }

  static fromObject(data: CoachSubscription): CoachSubscriptionEntity {
    return new CoachSubscriptionEntity(data);
  }
}
