import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Balance } from '@app/types';

@Schema({
  collection: 'balances',
  timestamps: true,
})
export class BalanceModel extends Document implements Balance {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public count: number;

  @Prop({
    required: true,
  })
  public workoutId: string;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceModel);
