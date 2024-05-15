import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  LIST_LIMIT,
} from 'src/shared/const';
import { PaginationResult } from '@app/core';
import { UsersQuery } from './query';
import { USERS_READY_COUNT } from './user.const';

const PipelineStage: { [key: string]: PipelineStage } = {
  AddStringId: {
    $addFields: {
      id: { $toString: '$_id' },
    },
  },
  LookupAvatars: {
    $lookup: {
      from: 'files',
      let: { imageId: '$avatar' },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$imageId' }] } } },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
      ],
      as: 'avatar',
    },
  },
  LookupCertificates: {
    $lookup: {
      from: 'files',
      let: { certificatesIds: '$certificates' },
      pipeline: [
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        {
          $match: {
            $expr: {
              $in: ['$id', '$$certificatesIds'],
            },
          },
        },
      ],
      as: 'certificates',
    },
  },
  LookupBackgroundImages: {
    $lookup: {
      from: 'files',
      let: { imageId: '$backgroundImage' },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$imageId' }] } } },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
      ],
      as: 'backgroundImage',
    },
  },
};

function generateFilter(query?: UsersQuery) {
  const filter = {};

  if (query?.workoutTypes) {
    Object.assign(filter, {
      workoutTypes: { $in: query.workoutTypes },
    });
  }

  if (query?.locations) {
    Object.assign(filter, {
      location: { $in: query.locations },
    });
  }

  if (query?.level) {
    Object.assign(filter, {
      level: query.level,
    });
  }

  if (query?.role) {
    Object.assign(filter, {
      role: query.role,
    });
  }

  return filter;
}

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(@InjectModel(UserModel.name) UserModel: Model<UserModel>) {
    super(UserModel, UserEntity.fromObject);
  }

  public async findFullUser(id: string): Promise<UserEntity | null> {
    const document = await this.model
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.AddStringId,
        PipelineStage.LookupAvatars,
        {
          $unwind: {
            path: '$avatar',
            preserveNullAndEmptyArrays: true,
          },
        },
        PipelineStage.LookupBackgroundImages,
        { $unwind: '$backgroundImage' },
        PipelineStage.LookupCertificates,
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return this.createEntityFromDocument(document);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async find(query?: UsersQuery): Promise<PaginationResult<UserEntity>> {
    const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;
    const filter = query ? generateFilter(query) : {};

    const [records, recordsCount] = await Promise.all([
      this.model
        .aggregate<UserModel>([
          { $match: filter },
          { $sort: { createdAt: sortDirection } },
          { $skip: skip },
          { $limit: limit },
          PipelineStage.AddStringId,
          PipelineStage.LookupAvatars,
          {
            $unwind: {
              path: '$avatar',
              preserveNullAndEmptyArrays: true,
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

  public async findReady(): Promise<UserEntity[]> {
    const records = await this.model
      .aggregate<UserModel>([
        { $match: { isReady: true } },
        { $sort: { createdAt: DEFAULT_SORT_DIRECTION } },
        { $limit: USERS_READY_COUNT },
        PipelineStage.AddStringId,
        PipelineStage.LookupAvatars,
        {
          $unwind: {
            path: '$avatar',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .exec();

    return this.createEntitiesFromDocuments(records);
  }

  public async findUserCertificates(
    id: string,
  ): Promise<string[] | undefined | null> {
    const document = await this.model.findById(id).exec();

    if (!document) {
      return null;
    }

    return document.certificates;
  }
}
