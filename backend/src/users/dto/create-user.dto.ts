import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';

class BaseUserDto {
  public avatar: string;
  public dateOfBirth?: Date;
  public email: string;
  public name: string;
  public password: string;
  public role: UserRole;
  public sex: UserSex;
  public description: string;
  public location: MetroStation;
  public backgroundImage?: string;
  public level: UserLevel;
  public workoutTypes: WorkoutType[];
  public isReady: boolean;
  public createdAt: Date;
  public certificate?: string;
  public achievements?: string;
  public caloriesToLose?: number;
  public caloriesPerDay?: number;
  public timeForWorkout?: WorkoutDuration;
}

export class CreateDefaultUserDto extends BaseUserDto {
  public caloriesToLose: number;
  public caloriesPerDay: number;
  public timeForWorkout: WorkoutDuration;
}

export class CreateCoachUserDto extends BaseUserDto {
  public certificate: string;
  public achievements: string;
}

export type CreateUserDto = CreateCoachUserDto | CreateDefaultUserDto;
