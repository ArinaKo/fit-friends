import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { WorkoutEntity } from './workout.entity';
import { WorkoutModel } from './workout.model';
import { DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/const';
import { FullWorkoutQuery } from './query';

const PipelineStage: { [key: string]: PipelineStage } = {
  AddIdString: {
    $addFields: {
      id: { $toString: '$_id' },
    },
  },
};

function generateFilter(query: FullWorkoutQuery) {
  let filter = {};

  if (query?.minCalories || query?.maxCalories) {
    let caloriesFilter = Object.assign(
      query?.minCalories ? { $gte: query.minCalories } : {},
      query?.maxCalories ? { $lte: query.maxCalories } : {},
    );

    Object.assign(filter, { calories: caloriesFilter });
  }

  if (query?.minPrice || query?.maxPrice) {
    let priceFilter = Object.assign(
      query?.minPrice ? { $gte: query.minPrice } : {},
      query?.maxPrice ? { $lte: query.maxPrice } : {},
    );

    Object.assign(filter, { price: priceFilter });
  }

  if (query?.minRating || query?.maxRating) {
    let ratingFilter = Object.assign(
      query?.minRating ? { $gte: query.minRating } : {},
      query?.maxRating ? { $lte: query.maxRating } : {},
    );

    Object.assign(filter, { rating: ratingFilter });
  }

  if (query?.workoutTypes) {
    Object.assign(filter, {
      type: { $in: query.workoutTypes },
    });
  }

  if (query?.workoutDurations) {
    Object.assign(filter, {
      duration: { $in: query.workoutDurations },
    });
  }

  return filter;
}

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

  public async find(
    query?: FullWorkoutQuery,
    coachId?: string,
  ): Promise<PaginationResult<WorkoutEntity>> {
    const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;
    let filter = query ? generateFilter(query) : {};

    if (coachId) {
      Object.assign(filter, { coachId });
    }

    const [records, recordsCount] = await Promise.all([
      this.model
        .aggregate<WorkoutModel>([
          { $match: filter },
          { $sort: { price: sortDirection } },
          { $skip: skip },
          { $limit: limit },
          {
            $addFields: {
              id: { $toString: '$_id' },
            },
          },
        ])
        .exec(),
      this.model.countDocuments(filter),
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
