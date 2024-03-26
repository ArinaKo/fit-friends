import { UserLevel } from './user-level.enum';
import { WorkoutSexFor } from './workout-sex-for.enum';
import { WorkoutType } from './workout-type.enum';
import { WorkoutDuration } from './workouts-durations.const';

export interface Workout {
  id?: string;
  title: string;
  backgroundImage: string;
  level: UserLevel;
  type: WorkoutType;
  duration: WorkoutDuration;
  price: number;
  calories: number;
  description: string;
  userSex: WorkoutSexFor;
  video: string;
  coachId: string;
  isSpecial: boolean;
  rating?: number;
}
