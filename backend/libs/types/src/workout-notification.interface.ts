import { WorkoutType } from './workout-type.enum';

export interface WorkoutNotification {
  coachName: string;
  title: string;
  type: WorkoutType;
  calories: number;
  description: string;
}
