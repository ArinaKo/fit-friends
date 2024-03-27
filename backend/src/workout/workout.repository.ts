import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { WorkoutEntity } from './workout.entity';
import { WorkoutModel } from './workout.model';
import { DEFAULT_PAGE, DEFAULT_SORTING, LIST_LIMIT } from 'src/const';

const PipelineStage: { [key: string]: PipelineStage } = {
  AddIdString: {
    $addFields: {
      id: { $toString: '$_id' },
    },
  },
};

@Injectable()
export class WorkoutRepository extends BaseMongoRepository<
  WorkoutEntity,
  WorkoutModel
> {
  constructor(
    @InjectModel(WorkoutModel.name) WorkoutModel: Model<WorkoutModel>,
  ) {
    super(WorkoutModel, WorkoutEntity.fromObject);
  }

  public async findById(id: string): Promise<WorkoutEntity | null> {
    const document = await this.model
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.AddIdString,
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return this.createEntityFromDocument(document);
  }

  public async find(): Promise<PaginationResult<WorkoutEntity>> {
    const records = await this.model.aggregate<WorkoutModel>([
      { $sort: { createdAt: DEFAULT_SORTING } },
      { $limit: LIST_LIMIT },
      {
        $addFields: {
          id: { $toString: '$_id' },
        },
      },
    ]).exec();

    const recordsCount = records.length;

    return {
      entities: this.createEntitiesFromDocuments(records),
      currentPage: DEFAULT_PAGE,
      totalPages: this.calculatePages(recordsCount, LIST_LIMIT),
      itemsPerPage: LIST_LIMIT,
      totalItems: recordsCount,
    };
  }
}
