import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@app/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/shared/guards';
import { WorkoutModule } from './workout/workout.module';
import { FriendsModule } from './friends/friends.module';
import { OrderModule } from './order/order.module';
import { BalanceModule } from './balance/balance.module';
import { CommentModule } from './comment/comment.module';
import { WorkoutRequestModule } from './workout-request/workout-request.module';
import { NotificationModule } from './notification/notification.module';
import { FileVaultModule } from './file-vault/file-vault.module';
import { CoachSubscriptionModule } from './coach-subscription/coach-subscription.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserModule,
    AuthModule,
    WorkoutModule,
    FriendsModule,
    OrderModule,
    BalanceModule,
    CommentModule,
    WorkoutRequestModule,
    NotificationModule,
    FileVaultModule,
    CoachSubscriptionModule,
    MailModule,
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
