import { store } from '../store/index.js';
import {
  AuthorizationStatus,
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
} from '../const';
import { FileData } from './file-data.js';
import { Workout } from './workout.js';

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
  timeForWorkout: string;
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

export type WorkoutForm = {
  title: string;
  type: string | undefined;
  duration: string | undefined;
  level: string | undefined;
  calories: string;
  price: string;
  userSex: string;
  description: string;
  hasVideo: boolean;
  isSpecial: boolean;
  validationErrors: {
    title: string | undefined;
    type: string | undefined;
    duration: string | undefined;
    level: string | undefined;
    calories: string | undefined;
    price: string | undefined;
    description: string | undefined;
    video: string | undefined;
  };
  isSending: boolean;
};

export type WorkoutsList = {
  workouts: Workout[];
  limit: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  price: {
    min: number;
    max: number;
  };
  calories: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
    max: number;
  };
  filter: {
    price: {
      min: number | undefined;
      max: number | undefined;
    };
    calories: {
      min: number | undefined;
      max: number | undefined;
    };
    rating: {
      min: number;
      max: number;
    };
    duration: string[];
  };
  isDataLoading: boolean;
};
