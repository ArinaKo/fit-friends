import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber, WorkoutType, WorkoutNotification } from '@app/types';

export class NotificationModel extends Document implements WorkoutNotification {
  @Prop({
    required: true,
    type: String,
    enum: WorkoutType,
  })
  public type: WorkoutType;

  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
  })
  public calories: number;

  @Prop({
    required: true,
  })
  public coachName: string;
}

@Schema({
  collection: 'subscribers',
  timestamps: true,
})
export class SubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
    type: [NotificationModel],
  })
  public notifications: NotificationModel[];

  @Prop({
    required: true,
  })
  public coaches: string[];
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
