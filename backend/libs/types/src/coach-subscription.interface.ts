import { Subscriber } from './subscriber.interface';

export interface CoachSubscription {
  id?: string;
  coachId: string;
  subscriber: Subscriber;
}
