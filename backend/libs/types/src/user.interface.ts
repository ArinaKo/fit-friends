import { UserLevel } from './user-level.enum';
import { UserRole } from './user-role.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutDuration } from './workouts-durations.const';
import { WorkoutType } from './workout-type.enum';
import { MetroStation } from './metro-station.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  sex: UserSex;
  dateOfBirth?: Date;
  role: UserRole;
  description: string;
  location: MetroStation;
  backgroundImage?: string;
  level: UserLevel;
  workoutTypes: WorkoutType[];
  isReady: boolean;
  createdAt: Date;
}

export interface CoachUser extends User {
  certificate?: string;
  achievements?: string;
}

export interface DefaultUser extends User {
  caloriesToLose?: number;
  caloriesPerDay?: number;
  timeForWorkout?: WorkoutDuration;
}

export interface AuthUser extends CoachUser, DefaultUser {
  passwordHash: string;
}
