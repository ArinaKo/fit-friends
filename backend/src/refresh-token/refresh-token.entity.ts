import { RefreshToken } from '@app/types';
import { Entity } from '@app/core';

export class RefreshTokenEntity implements RefreshToken, Entity<string> {
  public id?: string;
  public tokenId: string;
  public userId: string;
  public expiresIn: Date;

  constructor(refreshToken: RefreshToken) {
    this.populate(refreshToken);
  }

  public populate(data: RefreshToken): void {
    this.id = data.id;
    this.tokenId = data.tokenId;
    this.userId = data.userId;
    this.expiresIn = data.expiresIn;
  }

  public toPOJO() {
    return {
      id: this.id,
      tokenId: this.tokenId,
      userId: this.userId,
      expiresIn: this.expiresIn,
    };
  }

  static fromObject(data: RefreshToken): RefreshTokenEntity {
    return new RefreshTokenEntity(data);
  }
}
