import { User } from './user';
import { Workout } from './workout';

export type MainPageData = {
  workoutsForUser: Workout[];
  specialWorkouts: Workout[];
  popularWorkouts: Workout[];
  readyUsers: User[];
};
