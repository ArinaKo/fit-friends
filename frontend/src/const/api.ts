export const BACKEND_URL = 'http://localhost:3000';
export const REQUEST_TIMEOUT = 5000;

export const APIRoute = {
  CheckAuth: '/auth/login',
  Login: '/auth/login',
  Register: '/auth/register',
  UpdateUser: '/users/update',
} as const;
