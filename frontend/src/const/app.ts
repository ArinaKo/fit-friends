export const ACCESS_TOKEN_KEY_NAME = 'fit-friends-token';
export const REFRESH_TOKEN_KEY_NAME = 'fit-friends-refresh-token';
export const REFRESH_PENDING_KEY_NAME = 'fit-friends-refresh-pending';

export const REQUIRED_INPUT_MESSAGE = 'Поле обязательно для заполнения';

export const SALE_PERCENT = 10;

export const ListItemsPortion = {
  Default: 6,
  CoachWorkouts: 6,
  CoachOrders: 4,
  UserBalances: 8,
  Friends: 9,
  AllWorkouts: 6,
  AllUsers: 12,
};

export enum OrdersSortType {
  Sum = 'sum',
  Count = 'count',
}

export enum WorkoutsSortType {
  PriceDown = 'down',
  PriceUp = 'up',
  Free = 'free',
}

export enum OrderType {
  Default = 'абонемент',
}

export enum PaymentType {
  Visa = 'visa',
  Mir = 'mir',
  Umoney = 'umoney',
}

export enum OrderCountValue {
  Min = 1,
  Max = 50,
}

export const AvatarMaxSize = {
  ForHuman: '1 мегабайт',
  ToCheck: 8388608,
} as const;

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Register: '/register',
  Questionary: '/questionary',
  Main: '/main',
  Account: '/account',
  Friends: '/account/friends',
  Balance: '/account/balance',
  Orders: '/account/orders',
  CoachWorkouts: '/account/my-workouts',
  CreateWorkout: '/account/create-workout',
  Users: '/users',
  Workouts: '/workouts',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  AppData = 'APP_DATA',
  MainData = 'MAIN_DATA',
  UserForm = 'USER_FORM',
  UserData = 'USER_DATA',
  WorkoutForm = 'WORKOUT_FORM',
  CatalogData = 'CATALOG_DATA',
  WorkoutsList = 'WORKOUTS_LIST',
  UsersList = 'USERS_LIST',
  OrdersList = 'ORDERS_LIST',
  BalancesList = 'BALANCES_LIST',
  WorkoutInfo = 'WORKOUT_INFO',
  UserInfo = 'USER_INFO',
  CommentForm = 'COMMENT_FORM',
  OrderForm = 'ORDER_FORM',
}
