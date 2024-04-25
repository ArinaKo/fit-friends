import { UserLevel } from './user-level.enum';
import { UserRole } from './user-role.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutDuration } from './workouts-durations.const';
import { WorkoutType } from './workout-type.enum';
import { MetroStation } from './metro-station.enum';
import { FileData } from './file-data.interface';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string | FileData | null;
  sex: UserSex;
  dateOfBirth?: Date;
  role: UserRole;
  description?: string;
  location: MetroStation;
  backgroundImage: string | FileData;
  level: UserLevel;
  workoutTypes: WorkoutType[];
  isReady: boolean;
}

export interface CoachUser extends User {
  certificates?: string[] | FileData[];
  achievements?: string;
}

export interface DefaultUser extends User {
  caloriesToLose?: number;
  caloriesPerDay?: number;
  timeForWorkout?: WorkoutDuration;
}

export interface FullUser extends CoachUser, DefaultUser {
  passwordHash?: string;
}

export interface AuthUser extends FullUser {
  passwordHash: string;
}
