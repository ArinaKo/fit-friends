import { FileData } from './file-data';
import { User } from './user';
import { Workout } from './workout';

export type SubscriptionStatus = {
  subscriptionStatus: boolean;
};

export type FriendshipStatus = {
  isFriend: boolean;
};

export type CoachInfo = SubscriptionStatus & {
  workouts: Workout[];
};

export type FullUser = User &
  FriendshipStatus & {
    description: string;
    backgroundImage: FileData;
    certificates?: FileData[];
  };
