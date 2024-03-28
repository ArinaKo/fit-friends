import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsModel, FriendsSchema } from './friends.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendsModel.name, schema: FriendsSchema },
    ]),
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
