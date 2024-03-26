import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  UserLevel,
  UserSex,
  Workout,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';

@Schema({
  collection: 'workouts',
  timestamps: true,
})
export class WorkoutModel extends Document implements Workout {
  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: true,
  })
  public backgroundImage: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLevel,
  })
  public level: UserLevel;

  @Prop({
    required: true,
    type: String,
    enum: WorkoutType,
  })
  public type: WorkoutType;

  @Prop({
    required: true,
    type: String,
    enum: WorkoutDuration,
  })
  public duration: WorkoutDuration;

  @Prop({
    required: true,
  })
  public price: number;

  @Prop({
    required: true,
  })
  public calories: number;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: UserSex,
  })
  public userSex: UserSex;

  @Prop({
    required: true,
  })
  public video: string;

  @Prop({
    required: true,
  })
  public coachId: string;

  @Prop({
    required: true,
  })
  public isSpecial: boolean;
}

export const WorkoutSchema = SchemaFactory.createForClass(WorkoutModel);
