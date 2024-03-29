import { Order, OrderType, PaymentType } from '@app/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'orders',
  timestamps: true,
})
export class OrderModel extends Document implements Order {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
    type: String,
    enum: OrderType,
  })
  public type: OrderType;

  @Prop({
    required: true,
  })
  public workoutId: string;

  @Prop({
    required: true,
  })
  public workoutPrice: number;

  @Prop({
    required: true,
  })
  public count: number;

  @Prop({
    required: true,
  })
  public totalPrice: number;

  @Prop({
    required: true,
    type: String,
    enum: PaymentType,
  })
  public paymentType: PaymentType;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
