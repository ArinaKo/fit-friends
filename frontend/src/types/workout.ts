import {
  UserLevel,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '../const';

export type Workout = {
  id: string;
  title: string;
  backgroundImage: string;
  level: UserLevel;
  type: WorkoutType;
  duration: WorkoutDuration;
  price: number;
  calories: number;
  description: string;
  userSex: WorkoutSexFor;
  coachId: string;
  isSpecial: boolean;
  rating: number;
};
