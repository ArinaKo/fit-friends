import { UserLevel } from './user-level.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutType } from './workout-type.enum';
import { WorkoutDuration } from './workouts-durations.const';

export interface Workout {
  id: string;
  title: string;
  backgroundImage: string;
  level: UserLevel;
  type: WorkoutType;
  duration: WorkoutDuration;
  price: number;
  calories: number;
  description: string;
  userSex: UserSex;
  video: string;
  coachId: string;
  isSpecial: boolean;
}
