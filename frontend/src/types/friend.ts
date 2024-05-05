import { RequestStatus } from '../const';
import { User } from './user';

export type WorkoutRequest = {
  id: string;
  status: RequestStatus;
};

export type Friend = {
  user: User;
  workoutRequest?: WorkoutRequest;
};
