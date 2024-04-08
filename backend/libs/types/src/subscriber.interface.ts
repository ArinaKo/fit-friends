import { WorkoutNotification } from './workout-notification.interface';

export interface Subscriber {
  id?: string;
  userId: string;
  coaches: string[];
  notifications: WorkoutNotification[];
}
