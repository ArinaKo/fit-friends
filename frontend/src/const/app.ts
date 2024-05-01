export const ACCESS_TOKEN_KEY_NAME = 'fit-friends-token';
export const REFRESH_TOKEN_KEY_NAME = 'fit-friends-refresh-token';
export const REFRESH_PENDING_KEY_NAME = 'fit-friends-refresh-pending';

export const REQUIRED_INPUT_MESSAGE = 'Поле обязательно для заполнения';

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
  User: '/users/:userId',
  Workouts: '/workouts',
  Workout: '/workouts/:workoutId',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  AppData = 'APP_DATA',
  UserForm = 'USER_FORM',
  UserData = 'USER_DATA',
  WorkoutForm = 'WORKOUT_FORM',
}
