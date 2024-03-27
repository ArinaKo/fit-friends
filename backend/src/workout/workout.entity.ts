import { Entity } from '@app/core';
import {
  UserLevel,
  Workout,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '@app/types';

export class WorkoutEntity implements Workout, Entity<string> {
  public id?: string;
  public title: string;
  public backgroundImage: string;
  public level: UserLevel;
  public type: WorkoutType;
  public duration: WorkoutDuration;
  public price: number;
  public calories: number;
  public description: string;
  public userSex: WorkoutSexFor;
  public video: string;
  public coachId: string;
  public isSpecial: boolean;
  public rating: number;

  constructor(workout: Workout) {
    this.populate(workout);
  }
  public toPOJO() {
    return {
      id: this.id,
      title: this.title,
      backgroundImage: this.backgroundImage,
      level: this.level,
      type: this.type,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      userSex: this.userSex,
      video: this.video,
      coachId: this.coachId,
      isSpecial: this.isSpecial,
      rating: this.rating,
    };
  }

  public populate(data: Workout): void {
    this.id = data.id;
    this.title = data.title;
    this.backgroundImage = data.backgroundImage;
    this.level = data.level;
    this.type = data.type;
    this.duration = data.duration;
    this.price = data.price;
    this.calories = data.calories;
    this.description = data.description;
    this.userSex = data.userSex;
    this.video = data.video;
    this.coachId = data.coachId;
    this.isSpecial = data.isSpecial;
    this.rating = data.rating;
  }

  static fromObject(data: Workout): WorkoutEntity {
    return new WorkoutEntity(data);
  }
}
