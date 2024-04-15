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
