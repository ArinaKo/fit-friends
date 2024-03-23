import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { DEFAULT_PAGE, DEFAULT_SORTING, LIST_LIMIT } from 'src/const';
import { PaginationResult } from '@app/types';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(@InjectModel(UserModel.name) UserModel: Model<UserModel>) {
    super(UserModel, UserEntity.fromObject);
  }

  private calculatePages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async find(): Promise<PaginationResult<UserEntity>> {
    const records = await this.model.aggregate<UserModel>([
        { $sort: { createdAt: DEFAULT_SORTING } },
        { $limit: LIST_LIMIT },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
      ]).exec();

    const usersCount = records.length;

    return {
      entities: this.createEntitiesFromDocuments(records),
      currentPage: DEFAULT_PAGE,
      totalPages: this.calculatePages(usersCount, LIST_LIMIT),
      itemsPerPage: LIST_LIMIT,
      totalItems: usersCount,
    };
  }
}
