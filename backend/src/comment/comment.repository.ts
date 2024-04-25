import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { CommentEntity } from './comment.entity';
import { CommentModel } from './comment.model';
import { BaseQuery } from 'src/shared/query/base.query';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  LIST_LIMIT,
} from 'src/shared/const';

const PipelineStage: { [key: string]: PipelineStage } = {
  AddStringId: {
    $addFields: {
      id: { $toString: '$_id' },
    },
  },
  LookupUsers: {
    $lookup: {
      from: 'users',
      let: { userId: '$userId' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', { $toObjectId: '$$userId' }] },
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        {
          $lookup: {
            from: 'files',
            let: { imageId: '$avatar' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', { $toObjectId: '$$imageId' }] },
                },
              },
              {
                $addFields: {
                  id: { $toString: '$_id' },
                },
              },
            ],
            as: 'avatar',
          },
        },
        {
          $unwind: {
            path: '$avatar',
            preserveNullAndEmptyArrays: true,
          },
        },
      ],
      as: 'user',
    },
  },
};

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

  public async find(
    workoutId: string,
    query?: BaseQuery,
  ): Promise<PaginationResult<CommentEntity>> {
    const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;

    const [records, recordsCount] = await Promise.all([
      this.model
        .aggregate([
          { $match: { workoutId } },
          { $sort: { createdAt: sortDirection } },
          { $skip: skip },
          { $limit: limit },
          PipelineStage.AddStringId,
          PipelineStage.LookupUsers,
          { $unwind: '$user' },
          { $project: { userId: false, workoutId: false } },
        ])
        .exec(),
      this.model.countDocuments({ workoutId }),
    ]);

    return {
      entities: this.createEntitiesFromDocuments(records),
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: this.calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }
}
