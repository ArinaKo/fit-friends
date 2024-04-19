import { UserRole, UserSex } from './user';

export const EmptyUserForm = {
  Email: '',
  Password: '',
  Name: '',
  Sex: UserSex.Female,
  DateOfBirth: '',
  Role: UserRole.Coach,
  Location: undefined,
  ValidationsErrors: {
    email: undefined,
    password: undefined,
    name: undefined,
    sex: undefined,
    dateOfBirth: undefined,
    role: undefined,
    location: undefined,
  }
} as const;
