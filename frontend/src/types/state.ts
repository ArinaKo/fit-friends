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
  sex: UserSex;
  dateOfBirth: string;
  role: UserRole;
  location: MetroStation | undefined;
  avatar: string | undefined;
  level: UserLevel;
  status: boolean;
  workoutTypes: WorkoutType[];
  timeForWorkout: WorkoutDuration;
  caloriesToLose: string;
  caloriesPerDay: string;
  certificates: string[];
  achievements: string;
  validationErrors: {
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    dateOfBirth: string | undefined;
    location: string | undefined;
    avatar: string | undefined;
    workoutTypes: string | undefined;
    caloriesToLose: string | undefined;
    caloriesPerDay: string | undefined;
    certificates: string | undefined;
    achievements: string | undefined;
  };
  isSending: boolean;
};
