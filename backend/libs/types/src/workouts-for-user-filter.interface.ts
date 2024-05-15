import { UserLevel } from './user-level.enum';
import { WorkoutDuration } from './workouts-durations.const';
import { WorkoutType } from './workout-type.enum';
import { WorkoutSexFor } from './workout-sex-for.enum';

export interface WorkoutsForUserFilter {
  sex: WorkoutSexFor[];
  level: UserLevel;
  types: WorkoutType[];
  duration?: WorkoutDuration;
}
