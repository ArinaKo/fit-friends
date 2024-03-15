import { UserLevel } from './user-level.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutType } from './workout-type.enum';
import { WorkoutsDurations } from './workouts-durations.const';

export interface Workout {
  id: string;
  name: string;
  backgroundImage: string;
  level: UserLevel;
  type: WorkoutType;
  duration: WorkoutsDurations;
  price: number;
  calories: number;
  description: string;
  userSex: UserSex;
  video: string;
  rating: number;
  coachId: string;
  isSpecial: boolean;
}
