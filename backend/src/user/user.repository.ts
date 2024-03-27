import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { DEFAULT_PAGE, DEFAULT_SORTING, LIST_LIMIT } from 'src/const';
import { PaginationResult } from '@app/core';
import { UsersQuery } from './query';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(@InjectModel(UserModel.name) UserModel: Model<UserModel>) {
    super(UserModel, UserEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async find(query?: UsersQuery): Promise<PaginationResult<UserEntity>> {
    const sorting = query?.sortDirection ?? DEFAULT_SORTING;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;

    let filter = {};

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

    const [records, recordsCount] = await Promise.all([
      this.model
        .aggregate<UserModel>([
          { $match: filter },
          { $sort: { createdAt: sorting } },
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
