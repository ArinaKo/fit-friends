import { UserLevel, UserSex, WorkoutDuration, WorkoutType } from '@app/types';

export class CreateWorkoutDto {
  public title: string;
  public backgroundImage: string;
  public level: UserLevel;
  public type: WorkoutType;
  public duration: WorkoutDuration;
  public price: number;
  public calories: number;
  public description: string;
  public userSex: UserSex;
  public video: string;
  public coachId: string;
  public isSpecial: boolean;
}
