import { Entity } from '@app/core';
import { Comment } from '@app/types';
import { UserEntity } from 'src/user/user.entity';

export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public userId: string;
  public workoutId: string;
  public rating: number;
  public text: string;
  public user?: UserEntity;

  constructor(data: Comment) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      workoutId: this.workoutId,
      rating: this.rating,
      text: this.text,
      user: this.user ? this.user.toPOJO() : undefined,
    };
  }

  public populate(data: Comment): void {
    this.id = data.id;
    this.userId = data.userId;
    this.workoutId = data.workoutId;
    this.rating = data.rating;
    this.text = data.text;
    this.user = data.user ? UserEntity.fromObject(data.user) : undefined;
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
