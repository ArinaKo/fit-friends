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

@Module({
  imports: [
    UserModule,
    WorkoutModule,
    FriendsModule,
    OrderModule,
    CommentModule,
    WorkoutRequestModule,
    FileVaultModule,
  ],
  controllers: [MockController],
  providers: [MockService],
})
export class MockModule {}
