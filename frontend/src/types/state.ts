import { store } from '../store/index.js';
import {
  AuthorizationStatus,
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '../const';
import { FileData } from './file-data.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  authStatus: AuthorizationStatus;
  userRole: UserRole | undefined;
};

export type UserForm = {
  email: string;
  password: string;
  name: string;
  sex: string;
  dateOfBirth: string;
  role: UserRole;
  location: string | undefined;
  avatar: string | undefined;
  level: string;
  status: boolean;
  workoutTypes: WorkoutType[];
  timeForWorkout: WorkoutDuration;
  caloriesToLose: string;
  caloriesPerDay: string;
  certificatesAmount: number;
  achievements: string;
  description: string;
  validationErrors: {
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    sex: string | undefined;
    dateOfBirth: string | undefined;
    location: string | undefined;
    avatar: string | undefined;
    level: string | undefined;
    workoutTypes: string | undefined;
    caloriesToLose: string | undefined;
    caloriesPerDay: string | undefined;
    certificatesAmount: string | undefined;
    achievements: string | undefined;
    description: string | undefined;
  };
  isSending: boolean;
};

export type UserData = {
  name: string;
  location: MetroStation;
  avatar: FileData | undefined;
  level: UserLevel;
  sex: UserSex;
  isReady: boolean;
  description: string;
  workoutTypes: WorkoutType[];
  caloriesToLose: number;
  caloriesPerDay: number;
  certificates: FileData[];
  isDataReady: boolean;
  isDataUpdating: boolean;
};
