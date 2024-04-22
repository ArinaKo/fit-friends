export const BACKEND_URL = 'http://localhost:3000';
export const REQUEST_TIMEOUT = 5000;

export const APIRoute = {
  CheckAuth: '/auth/login',
  Login: '/auth/login',
  Register: '/auth/register',
  QuestionaryUser: 'users/questionary-user',
  QuestionaryCoach: 'users/questionary-coach',
  UpdateUser: '/users/update',
} as const;
