import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoachSubscription } from '@app/types';

@Schema({
  collection: 'coach-subscriptions',
  timestamps: true,
})
export class CoachSubscriptionModel extends Document implements CoachSubscription {
  @Prop({
    required: true,
  })
  public coachId: string;

  @Prop({
    required: true,
  })
  public newWorkouts: string[];

  @Prop({
    required: true,
  })
  public subscribers: string[];
}

export const CoachSubscriptionSchema =
  SchemaFactory.createForClass(CoachSubscriptionModel);
