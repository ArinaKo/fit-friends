import { store } from '../store/index.js';
import { AuthorizationStatus } from './authorization-status.enum.js';
import { UserRole } from './user-role.enum.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  authStatus: AuthorizationStatus;
  userRole: UserRole | undefined;
};

export type UserForm = {
  email: string;
  password: string;
  isSending: boolean;
};
