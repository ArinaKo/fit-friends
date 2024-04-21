import { UserLevel, UserRole, UserSex } from './user';
import { WorkoutDuration } from './workout';

export const EmptyUserForm = {
  Email: '',
  Password: '',
  Name: '',
  Sex: UserSex.Female,
  DateOfBirth: '',
  Role: UserRole.Coach,
  Location: undefined,
  Avatar: undefined,
  Level: UserLevel.Amateur,
  WorkoutTypes: [],
  TimeForWorkout: WorkoutDuration.Medium,
  CaloriesToLose: '',
  CaloriesPerDay: '',
  Certificates: [],
  Achievements: '',
  ValidationsErrors: {
    email: undefined,
    password: undefined,
    name: undefined,
    dateOfBirth: undefined,
    location: undefined,
    avatar: undefined,
    workoutTypes: undefined,
    caloriesToLose: undefined,
    caloriesPerDay: undefined,
    certificates: undefined,
    achievements: undefined,
  },
};
