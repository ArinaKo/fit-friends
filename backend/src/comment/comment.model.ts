import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@app/types';

@Schema({
  collection: 'comments',
  timestamps: true,
})
export class CommentModel extends Document implements Comment {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public workoutId: string;

  @Prop({
    required: true,
  })
  public rating: number;

  @Prop({
    required: true,
  })
  public text: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
