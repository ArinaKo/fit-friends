import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AuthUser,
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    required: true,
  })
  public avatar: string;

  @Prop()
  public dateOfBirth?: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Default,
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: UserSex,
  })
  public sex: UserSex;

  @Prop()
  public description?: string;

  @Prop({
    required: true,
    type: String,
    enum: MetroStation,
  })
  public location: MetroStation;

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
    type: () => [String],
    enum: WorkoutType,
  })
  public workoutTypes: WorkoutType[];

  @Prop({
    required: true,
  })
  public isReady: boolean;

  @Prop()
  public certificates?: string[];

  @Prop()
  public achievements?: string;

  @Prop()
  public caloriesToLose?: number;

  @Prop()
  public caloriesPerDay?: number;

  @Prop({
    type: String,
    enum: WorkoutDuration,
  })
  public timeForWorkout?: WorkoutDuration;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
