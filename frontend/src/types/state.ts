import { store } from '../store/index';
import {
  AuthorizationStatus,
  MetroStation,
  OrderType,
  OrdersSortType,
  PaymentType,
  PopupKey,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
} from '../const';
import { FileData } from './file-data';
import { Workout } from './workout';
import { WorkoutOrders } from './workout-orders';
import { WorkoutBalance } from './workout-balance';
import { User } from './user';
import { Comment } from './comment';
import { Route } from './route';
import { Notification } from './notification';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  authStatus: AuthorizationStatus;
  userRole: UserRole | undefined;
  userId: string;
  notifications: Notification[];
  activeWorkout: string | undefined;
  activePage: Route | undefined;
  activePopup: PopupKey | undefined;
};

export type MainData = {
  workoutsForUser: Workout[];
  specialWorkouts: Workout[];
  popularWorkouts: Workout[];
  readyUsers: User[];
  isDataLoading: boolean;
};

export type CatalogData = {
  limit: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
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
  isDataEditing: boolean;
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
    types: string[];
    sorting: string | undefined;
  };
  isDataLoading: boolean;
};

export type OrdersList = {
  orders: WorkoutOrders[];
  isDataLoading: boolean;
  sorting: {
    type: OrdersSortType;
    directionDown: boolean;
  };
};

export type BalancesList = {
  balances: WorkoutBalance[];
  isDataLoading: boolean;
  isOnlyActive: boolean;
};

export type UsersList = {
  users: User[];
  filter: {
    locations: string[];
    types: string[];
    level: string;
    role: string | undefined;
  };
  isDataLoading: boolean;
};

export type WorkoutInfo = {
  id: string;
  coachId: string;
  title: string;
  price: string;
  description: string;
  isSpecial: boolean;
  video: FileData | undefined;
  backgroundImage: string;
  rating: number;
  type: string;
  calories: number;
  userSex: string;
  duration: string;
  coach: User | undefined;
  balance: number | null;
  comments: Comment[];
  isDataLoading: boolean;
  isDataEditing: boolean;
};

export type UserInfo = {
  id: string;
  name: string;
  location: MetroStation;
  role: UserRole;
  isReady: boolean;
  description: string;
  workoutTypes: WorkoutType[];
  level: UserLevel;
  isFriend: boolean;
  images: FileData[];
  certificates: FileData[];
  workouts: Workout[];
  subscriptionStatus: boolean;
  isDataLoading: boolean;
  isCoachInfoActual: boolean;
  isWorkoutsLoading: boolean;
};

export type CommentForm = {
  workoutId: string;
  rating: number;
  text: string;
  validationErrors: {
    text: string | undefined;
  };
  isSending: boolean;
};

export type OrderForm = {
  workoutId: string;
  price: number;
  type: OrderType;
  count: number;
  totalSum: number;
  paymentType: PaymentType;
  isSending: boolean;
};
