import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { WorkoutModule } from 'src/workout/workout.module';
import { FriendsModule } from 'src/friends/friends.module';
import { OrderModule } from 'src/order/order.module';
import { CommentModule } from 'src/comment/comment.module';
import { WorkoutRequestModule } from 'src/workout-request/workout-request.module';
import { FileVaultModule } from 'src/file-vault/file-vault.module';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SubscriberModule } from 'src/subscriber/subscriber.module';
import { BalanceModule } from 'src/balance/balance.module';

@Module({
  imports: [
    UserModule,
    WorkoutModule,
    FriendsModule,
    OrderModule,
    CommentModule,
    WorkoutRequestModule,
    FileVaultModule,
    NotificationModule,
    SubscriberModule,
    BalanceModule,
  ],
  controllers: [MockController],
  providers: [MockService],
})
export class MockModule {}
