export const BACKEND_URL = 'http://localhost:3000';
export const REQUEST_TIMEOUT = 5000;
export const STATIC_URL = `${BACKEND_URL}/static`;

export const APIRoute = {
  CheckAuth: '/auth/login',
  Login: '/auth/login',
  Register: '/auth/register',
  QuestionaryUser: 'users/questionary-user',
  QuestionaryCoach: 'users/questionary-coach',
  AuthUser: '/users',
  UpdateUser: '/users/update',
  UploadCertificate: '/users/certificates/upload',
  DeleteCertificate: '/users/certificates/delete',
  UpdateCertificate: '/users/certificates/update',
  AllUsers: '/users/all-users',
  AllWorkouts: '/workouts',
  CreateWorkout: '/workouts',
  UpdateWorkout: '/workouts',
  Workout: '/workouts',
  CoachWorkouts: '/workouts/coach',
  CoachOrders: '/orders',
  UserBalances: '/balance',
  WorkoutBalance: '/balance',
  DecreaseBalance: '/balance/decrease',
  UserFriends: '/friends',
  CreateWorkoutRequest: '/workout-requests',
  UpdateWorkoutRequest: '/workout-requests',
  Comments: '/comments',
  Notifications: '/notifications',
} as const;
