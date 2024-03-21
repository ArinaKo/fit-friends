import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getJwtOptions } from '@app/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserModule } from '../users/user.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserModule,
  ],
  providers: [AuthService, JwtAccessStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}