import {
  UserLevel,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '../const';
import { Comment } from './comment';
import { FileData } from './file-data';
import { User } from './user';

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

export type FullWorkout = Workout & {
  coach: User;
  video: FileData;
  balance: null | number;
  comments: Comment[];
}
