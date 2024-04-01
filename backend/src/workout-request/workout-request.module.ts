import { Module } from '@nestjs/common';
import { WorkoutRequestController } from './workout-request.controller';
import { WorkoutRequestService } from './workout-request.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WorkoutRequestModel,
  WorkoutRequestSchema,
} from './workout-request.model';
import { WorkoutRequestRepository } from './workout-request.repository';
import { UserModule } from 'src/user/user.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutRequestModel.name, schema: WorkoutRequestSchema },
    ]),
    UserModule,
    FriendsModule,
  ],
  controllers: [WorkoutRequestController],
  providers: [WorkoutRequestRepository, WorkoutRequestService],
})
export class WorkoutRequestModule {}
