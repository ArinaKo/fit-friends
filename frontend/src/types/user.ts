import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
} from '../const';
import { FileData } from './file-data';

export type User = {
  id: string;
  avatar: FileData;
  name: string;
  role: UserRole;
  sex: UserSex;
  isReady: boolean;
  location: MetroStation;
  level: UserLevel;
  workoutTypes: WorkoutType[];
};
