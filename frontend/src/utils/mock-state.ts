import {
  AuthorizationStatus,
  MetroStation,
  NameSpace,
  OrderType,
  OrdersSortType,
  PaymentType,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '../const';
import {
  AppData,
  BalancesList,
  CatalogData,
  CommentForm,
  MainData,
  OrderForm,
  OrdersList,
  State,
  UserData,
  UserForm,
  UserInfo,
  UsersList,
  WorkoutForm,
  WorkoutInfo,
  WorkoutsList,
} from '../types';
import { datatype, image, lorem } from 'faker';
import { randomUUID } from 'node:crypto';
import { makeFakeUser, getRandomItem } from './mock';

export const makeFakeAppDataSlice = (): AppData => ({
  authStatus: AuthorizationStatus.Unknown,
  userRole: UserRole.Default,
  userId: '',
  notifications: [],
  activeWorkout: undefined,
  activePage: undefined,
  activePopup: undefined,
});

export const makeFakeMainDataSlice = (): MainData => ({
  workoutsForUser: [],
  specialWorkouts: [],
  popularWorkouts: [],
  readyUsers: [],
  isDataLoading: false,
});

export const makeFakeCatalogDataSlice = (): CatalogData => ({
  limit: 6,
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  itemsPerPage: 0,
  isDataLoading: false,
});

export const makeFakeUserFormSlice = (): UserForm => ({
  email: 'email@local.local',
  password: '123456',
  name: 'John',
  sex: UserSex.Female,
  dateOfBirth: '19-03-1983',
  role: UserRole.Coach,
  location: MetroStation.Avtovo,
  avatar: 'image.jpg',
  level: UserLevel.Amateur,
  status: true,
  workoutTypes: [WorkoutType.Box],
  timeForWorkout: WorkoutDuration.Medium,
  caloriesToLose: '4000',
  caloriesPerDay: '1000',
  certificatesAmount: 2,
  achievements: 'achievements text',
  description: 'description text',
  validationErrors: {
    email: undefined,
    password: undefined,
    name: undefined,
    sex: undefined,
    dateOfBirth: undefined,
    location: undefined,
    avatar: undefined,
    level: undefined,
    workoutTypes: undefined,
    caloriesToLose: undefined,
    caloriesPerDay: undefined,
    certificatesAmount: undefined,
    achievements: undefined,
    description: undefined,
  },
  isSending: false,
});

export const makeFakeUserDataSlice = (): UserData => ({
  name: '',
  location: MetroStation.Petrogadskaya,
  avatar: undefined,
  sex: UserSex.Other,
  level: UserLevel.Amateur,
  description: '',
  isReady: false,
  workoutTypes: [],
  caloriesToLose: 0,
  caloriesPerDay: 0,
  certificates: [],
  isDataReady: false,
  isDataUpdating: false,
  isDataEditing: false,
});

export const makeFakeWorkoutFormSlice = (): WorkoutForm => ({
  title: 'id',
  type: WorkoutType.Aerobic,
  duration: WorkoutDuration.Extra,
  level: UserLevel.Amateur,
  calories: '',
  price: '',
  userSex: WorkoutSexFor.Female,
  description: '',
  hasVideo: true,
  isSpecial: false,
  validationErrors: {
    title: undefined,
    type: undefined,
    duration: undefined,
    level: undefined,
    calories: undefined,
    price: undefined,
    description: undefined,
    video: undefined,
  },
  isSending: false,
});

export const makeFakeWorkoutsListSlice = (): WorkoutsList => ({
  workouts: [],
  price: {
    min: 0,
    max: 10000,
  },
  calories: {
    min: 100,
    max: 10000,
  },
  rating: {
    min: 0,
    max: 5,
  },
  filter: {
    price: {
      min: undefined,
      max: undefined,
    },
    calories: {
      min: undefined,
      max: undefined,
    },
    rating: {
      min: 0,
      max: 5,
    },
    duration: [],
    types: [],
    sorting: undefined,
  },
  isDataLoading: false,
});

export const makeFakeOrdersListSlice = (): OrdersList => ({
  orders: [],
  isDataLoading: false,
  sorting: {
    type: OrdersSortType.Count,
    directionDown: true,
  },
});

export const makeFakeBalancesListSlice = (): BalancesList => ({
  balances: [],
  isDataLoading: false,
  isOnlyActive: false,
});

export const makeFakeUsersListSlice = (): UsersList => ({
  users: [],
  filter: {
    locations: [],
    types: [],
    level: UserLevel.Beginner,
    role: undefined,
  },
  isDataLoading: false,
});

export const makeFakeWorkoutInfoSlice = (): WorkoutInfo => ({
  id: randomUUID(),
  coachId: randomUUID(),
  title: lorem.word(),
  price: String(datatype.number()),
  description: lorem.lines(1),
  backgroundImage: image.imageUrl(),
  type: getRandomItem(Object.values(WorkoutType)),
  duration: getRandomItem(Object.values(WorkoutDuration)),
  calories: datatype.number(),
  userSex: getRandomItem(Object.values(WorkoutSexFor)),
  isSpecial: datatype.boolean(),
  rating: datatype.number(),
  video: undefined,
  coach: makeFakeUser(),
  balance: null,
  comments: [],
  isDataLoading: false,
  isDataEditing: false,
  hasError: false,
});

export const makeFakeUserInfoSlice = (): UserInfo => ({
  id: 'id',
  name: '',
  location: MetroStation.Petrogadskaya,
  role: UserRole.Default,
  isReady: false,
  description: '',
  workoutTypes: [],
  level: UserLevel.Amateur,
  isFriend: false,
  images: [],
  certificates: [],
  workouts: [],
  subscriptionStatus: false,
  isDataLoading: false,
  isCoachInfoActual: true,
  isWorkoutsLoading: false,
  hasError: false,
});

export const makeFakeCommentFormSlice = (): CommentForm => ({
  workoutId: 'id',
  rating: 5,
  text: 'comment text',
  validationErrors: {
    text: undefined,
  },
  isSending: false,
});

export const makeFakeOrderFormSlice = (): OrderForm => ({
  workoutId: '',
  price: 0,
  type: OrderType.Default,
  count: 1,
  totalSum: 0,
  paymentType: PaymentType.Visa,
  isSending: false,
});

export const makeFakeState = (): State => ({
  [NameSpace.AppData]: makeFakeAppDataSlice(),
  [NameSpace.MainData]: makeFakeMainDataSlice(),
  [NameSpace.UserForm]: makeFakeUserFormSlice(),
  [NameSpace.UserData]: makeFakeUserDataSlice(),
  [NameSpace.WorkoutForm]: makeFakeWorkoutFormSlice(),
  [NameSpace.CatalogData]: makeFakeCatalogDataSlice(),
  [NameSpace.WorkoutsList]: makeFakeWorkoutsListSlice(),
  [NameSpace.UsersList]: makeFakeUsersListSlice(),
  [NameSpace.OrdersList]: makeFakeOrdersListSlice(),
  [NameSpace.BalancesList]: makeFakeBalancesListSlice(),
  [NameSpace.WorkoutInfo]: makeFakeWorkoutInfoSlice(),
  [NameSpace.UserInfo]: makeFakeUserInfoSlice(),
  [NameSpace.CommentForm]: makeFakeCommentFormSlice(),
  [NameSpace.OrderForm]: makeFakeOrderFormSlice(),
});
