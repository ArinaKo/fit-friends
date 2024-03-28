import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserModel } from 'src/user/user.model';
import { Friends } from '@app/types';

@Schema({
  collection: 'friends',
  timestamps: true,
})
export class FriendsModel extends Document implements Friends {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }] })
  public friendsList: UserModel[];
}

export const FriendsSchema = SchemaFactory.createForClass(FriendsModel);
