import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { BaseMongoRepository } from '@app/core';
import { RefreshToken } from '@app/types';

export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    refreshTokenModel: Model<RefreshTokenModel>,
  ) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(tokenId: string): Promise<RefreshToken | null> {
    return this.model.findOne({ tokenId }).exec();
  }

  public async deleteExpiredTokens() {
    return this.model.deleteMany({ expiresIn: { $lt: new Date() } });
  }
}
