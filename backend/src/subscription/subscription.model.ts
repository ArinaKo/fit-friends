import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoachSubscription, Subscriber } from '@app/types';

@Schema()
class SubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public email: string;
}

@Schema({
  collection: 'subscriptions',
  timestamps: true,
})
export class SubscriptionModel extends Document implements CoachSubscription {
  @Prop({
    required: true,
  })
  public coachId: string;

  @Prop({
    required: true,
  })
  public subscriber: SubscriberModel;
}

export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionModel);
