import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { jwtConfig } from '@app/config';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenPayload } from '@app/types';
import { parseTime } from '@app/helpers';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();
    return this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken =
      await this.refreshTokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
