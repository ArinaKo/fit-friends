import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Notification } from '@app/types';

@Schema({
  collection: 'notifications',
  timestamps: true,
})
export class NotificationModel extends Document implements Notification {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public text: string;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationModel);
