import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getJwtOptions } from '@app/config';
import {
  JwtAccessStrategy,
  JwtRefreshStrategy,
  LocalStrategy,
} from '../shared/strategies/index';
import { UserModule } from '../user/user.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { FileVaultModule } from 'src/file-vault/file-vault.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserModule,
    RefreshTokenModule,
    FileVaultModule,
  ],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
