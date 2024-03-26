import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@app/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/core';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserModule,
    AuthModule,
    WorkoutModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
