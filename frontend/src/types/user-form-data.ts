import { UserRole, UserSex, MetroStation, UserLevel } from '../const';

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  name: string;
  sex: UserSex;
  dateOfBirth?: Date;
  role: UserRole;
  location: MetroStation;
  avatar: string;
  level: UserLevel;
};
