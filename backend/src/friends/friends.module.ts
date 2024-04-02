import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsModel, FriendsSchema } from './friends.model';
import { FriendsRepository } from './friends.repository';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendsModel.name, schema: FriendsSchema },
    ]),
    UserModule,
    NotificationModule,
  ],
  controllers: [FriendsController],
  providers: [FriendsRepository, FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
