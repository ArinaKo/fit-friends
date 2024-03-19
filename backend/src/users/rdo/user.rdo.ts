import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public avatar: string;

  @Expose()
  public dateOfBirth?: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public role: UserRole;

  @Expose()
  public sex: UserSex;

  @Expose()
  public location: MetroStation;

  @Expose()
  public level: UserLevel;

  @Expose()
  public workoutTypes: WorkoutType[];

  @Expose()
  public isReady: boolean;

  @Expose()
  public description: string;

  @Expose()
  public backgroundImage: string;

  @Expose()
  public certificate?: string;
}

export class FullUserRdo extends UserRdo {
  @Expose()
  public caloriesToLose?: number;

  @Expose()
  public caloriesPerDay?: number;

  @Expose()
  public timeForWorkout?: WorkoutDuration;

  @Expose()
  public achievements?: string;
}
