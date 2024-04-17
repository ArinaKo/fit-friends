import { store } from '../store/index.js';
import { AuthorizationStatus, MetroStation, UserRole, UserSex } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  authStatus: AuthorizationStatus;
  userRole: UserRole | undefined;
};

export type UserForm = {
  email: string;
  password: string;
  name: string;
  sex: UserSex;
  dateOfBirth: string;
  role: UserRole;
  location: MetroStation | undefined;
  isSending: boolean;
};
