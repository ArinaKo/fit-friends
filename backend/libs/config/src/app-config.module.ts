import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import mongoConfig from './mongo.config';
import jwtConfig from './jwt.config';
import mailConfig from './mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtConfig, mailConfig],
    }),
  ],
})
export class AppConfigModule {}
