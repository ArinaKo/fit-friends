import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@app/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards';
import { WorkoutModule } from './workout/workout.module';
import { FriendsModule } from './friends/friends.module';
import { OrderModule } from './order/order.module';
import { UserBalanceModule } from './user-balance/user-balance.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserModule,
    AuthModule,
    WorkoutModule,
    FriendsModule,
    OrderModule,
    UserBalanceModule,
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
