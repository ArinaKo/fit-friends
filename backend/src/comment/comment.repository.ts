import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { CommentEntity } from './comment.entity';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentRepository extends BaseMongoRepository<
  CommentEntity,
  CommentModel
> {
  constructor(
    @InjectModel(CommentModel.name) CommentModel: Model<CommentModel>,
  ) {
    super(CommentModel, CommentEntity.fromObject);
  }
}
