import { FileData } from './file-data.interface';
import { UserLevel } from './user-level.enum';
import { User } from './user.interface';
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
  video: string | FileData;
  coachId: string;
  coach?: User;
  isSpecial: boolean;
  rating: number;
}
