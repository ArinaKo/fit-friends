import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WorkoutModel } from 'src/workout/workout.model';
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
    type: Types.ObjectId,
    ref: 'WorkoutModel',
  })
  public workout: WorkoutModel;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceModel);
