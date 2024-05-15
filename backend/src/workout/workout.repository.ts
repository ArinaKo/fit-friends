import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { WorkoutEntity } from './workout.entity';
import { WorkoutModel } from './workout.model';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  LIST_LIMIT,
} from 'src/shared/const';
import { FullWorkoutQuery } from './query';
import { FieldRange, SortDirection, WorkoutsForUserFilter } from '@app/types';
import { WorkoutsCount, WorkoutsPriceSorting } from './workout.const';
import * as lodash from 'lodash';

const PipelineStage: { [key: string]: PipelineStage } = {
  AddStringId: {
    $addFields: {
      id: { $toString: '$_id' },
    },
  },
  LookupComments: {
    $lookup: {
      from: 'comments',
      let: { workoutId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: [{ $toObjectId: '$workoutId' }, '$$workoutId'] },
          },
        },
      ],
      as: 'comments',
    },
  },
  CountRating: {
    $addFields: {
      newRating: {
        $cond: [{ $size: '$comments' }, { $avg: '$comments.rating' }, 0],
      },
    },
  },
  LookupVideos: {
    $lookup: {
      from: 'files',
      let: { videoId: '$video' },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$videoId' }] } } },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
      ],
      as: 'video',
    },
  },
  LookupCoach: {
    $lookup: {
      from: 'users',
      let: { userId: '$coachId' },
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
      as: 'coach',
    },
  },
  LookupWorkouts: {
    $lookup: {
      from: 'workouts',
      localField: '_id',
      foreignField: '_id',
      as: 'workout',
    },
  },
};

function generateFilter(query: FullWorkoutQuery) {
  const filter = {};

  if (query?.minCalories || query?.maxCalories) {
    const caloriesFilter = Object.assign(
      query?.minCalories ? { $gte: query.minCalories } : {},
      query?.maxCalories ? { $lte: query.maxCalories } : {},
    );

    Object.assign(filter, { calories: caloriesFilter });
  }

  if (query?.minPrice || query?.maxPrice) {
    const priceFilter = Object.assign(
      query?.minPrice ? { $gte: query.minPrice } : {},
      query?.maxPrice ? { $lte: query.maxPrice } : {},
    );

    Object.assign(filter, { price: priceFilter });
  }

  if (query?.minRating || query?.maxRating) {
    const ratingFilter = Object.assign(
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

  public async countRating(id: string): Promise<number> {
    const document = await this.model
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.LookupComments,
        PipelineStage.CountRating,
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return Math.round(document.newRating);
  }

  public async findById(id: string): Promise<WorkoutEntity | null> {
    const document = await this.model
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.AddStringId,
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return this.createEntityFromDocument(document);
  }

  public async findFullWorkout(id: string): Promise<WorkoutEntity | null> {
    const document = await this.model
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.AddStringId,
        PipelineStage.LookupVideos,
        { $unwind: '$video' },
        PipelineStage.LookupCoach,
        { $unwind: '$coach' },
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return this.createEntityFromDocument(document);
  }

  public async find(
    query?: FullWorkoutQuery,
    coachId?: string,
  ): Promise<
    PaginationResult<WorkoutEntity> & {
      priceRange: FieldRange;
      caloriesRange: FieldRange;
    }
  > {
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;
    const filter = query ? generateFilter(query) : {};
    const sorting: PipelineStage =
      !query?.sorting || query.sorting === WorkoutsPriceSorting.Free
        ? { $sort: { createdAt: DEFAULT_SORT_DIRECTION } }
        : { $sort: { price: SortDirection[lodash.capitalize(query.sorting)] } };

    if (coachId) {
      Object.assign(filter, { coachId });
    }

    if (query?.sorting === WorkoutsPriceSorting.Free) {
      Object.assign(filter, { price: 0 });
    }

    const [records, recordsCount, price, calories] = await Promise.all([
      this.model
        .aggregate<WorkoutModel>([
          { $match: filter },
          sorting,
          { $skip: skip },
          { $limit: limit },
          PipelineStage.AddStringId,
        ])
        .exec(),
      this.model.countDocuments(filter),
      this.model
        .aggregate<{ min: number; max: number }>([
          {
            $group: {
              _id: null,
              max: { $max: '$price' },
              min: { $min: '$price' },
            },
          },
        ])
        .then((r) => r.at(0)),
      this.model
        .aggregate<{ min: number; max: number }>([
          {
            $group: {
              _id: null,
              max: { $max: '$calories' },
              min: { $min: '$calories' },
            },
          },
        ])
        .then((r) => r.at(0)),
    ]);

    return {
      entities: this.createEntitiesFromDocuments(records),
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: this.calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
      priceRange: [price?.min ?? 0, price?.max ?? 0],
      caloriesRange: [calories?.min ?? 0, calories?.max ?? 0],
    };
  }

  public async findSpecial(): Promise<WorkoutEntity[]> {
    const records = await this.model
      .aggregate<WorkoutModel>([
        { $match: { isSpecial: true } },
        { $sort: { createdAt: DEFAULT_SORT_DIRECTION } },
        { $limit: WorkoutsCount.Special },
        PipelineStage.AddStringId,
      ])
      .exec();

    return this.createEntitiesFromDocuments(records);
  }

  public async findPopular(): Promise<WorkoutEntity[]> {
    const records = await this.model
      .aggregate<WorkoutModel>([
        { $sort: { rating: DEFAULT_SORT_DIRECTION } },
        { $limit: WorkoutsCount.Popular },
        PipelineStage.AddStringId,
      ])
      .exec();

    return this.createEntitiesFromDocuments(records);
  }

  public async findForUser(
    filter: WorkoutsForUserFilter,
  ): Promise<WorkoutEntity[]> {
    const { sex, level, types, duration } = filter;
    const records = await this.model
      .aggregate<WorkoutModel>([
        {
          $facet: {
            filterByLevel: [{ $match: { level } }],
            filterByDuration: [{ $match: { duration } }],
            filterBySex: [{ $match: { userSex: { $in: sex } } }],
            filterByType: [{ $match: { type: { $in: types } } }],
          },
        },
        {
          $project: {
            result: {
              $concatArrays: [
                '$filterBySex',
                '$filterByLevel',
                '$filterByDuration',
                '$filterByType',
              ],
            },
          },
        },
        {
          $unwind: '$result',
        },
        { $sortByCount: '$result._id' },
        { $limit: WorkoutsCount.ForUser },
        PipelineStage.LookupWorkouts,
        {
          $unwind: '$workout',
        },
        {
          $replaceRoot: {
            newRoot: '$workout',
          },
        },
        PipelineStage.AddStringId,
      ])
      .exec();

    return this.createEntitiesFromDocuments(records);
  }
}
