import { UserLevel } from './user-level.enum';
import { UserRole } from './user-role.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutsTimes } from './workouts-times.const';
import { WorkoutType } from './workout-type.enum';

export interface User {
  name: string;
  email: string;
  avatar: string;
  sex: UserSex;
  dateOfBirth?: Date;
  role: UserRole;
  description: string;
  location: Location;
  backgroundImage: string;
  level: UserLevel;
  workoutTypes: WorkoutType[];
  isReady: boolean;
}

export interface CoachUser {
  certificate: string;
  achievements: string;
}

export interface DefaultUser {
  caloriesToLose: number;
  caloriesPerDay: number;
  timeForWorkout: (typeof WorkoutsTimes)[number];
}
