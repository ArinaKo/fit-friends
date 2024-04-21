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
  Users: '/users',
  Workouts: '/workouts',
} as const;

export const AccountPath = {
  Friends: 'friends',
  Customer: {
    Balance: 'balance',
  },
  Coach: {
    Orders: 'orders',
    Workouts: 'workouts',
    CreateWorkout: 'create-workout',
  },
} as const;

export const WorkoutsPath = {
  Workout: ':workoutId',
} as const;

export const UsersPath = {
  User: ':userId',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  AppData = 'APP_DATA',
  UserForm = 'USER_FORM',
}
