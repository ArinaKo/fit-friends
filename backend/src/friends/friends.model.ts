import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'friends',
  timestamps: true,
})
export class FriendsModel extends Document {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    type: () => String,
    default: [],
  })
  public friendsList: string[];
}

export const FriendsSchema = SchemaFactory.createForClass(FriendsModel);
