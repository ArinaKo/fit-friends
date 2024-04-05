import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@app/types';

@Schema({
  collection: 'coach-subscriptions',
  timestamps: true,
})
export class SubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public newWorkouts: string[];

  @Prop({
    required: true,
  })
  public coaches: string[];
}

export const SubscriberSchema =
  SchemaFactory.createForClass(SubscriberModel);
