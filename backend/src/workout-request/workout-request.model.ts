import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequestStatus, WorkoutRequest } from '@app/types';

@Schema({
  collection: 'workout-requests',
  timestamps: true,
})
export class WorkoutRequestModel extends Document implements WorkoutRequest {
  @Prop({
    required: true,
  })
  public userFromId: string;

  @Prop({
    required: true,
  })
  public userToId: string;

  @Prop({
    required: true,
    type: String,
    enum: RequestStatus,
  })
  public status: RequestStatus;
}

export const WorkoutRequestSchema =
  SchemaFactory.createForClass(WorkoutRequestModel);
