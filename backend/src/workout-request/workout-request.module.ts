import { Module } from '@nestjs/common';
import { WorkoutRequestController } from './workout-request.controller';
import { WorkoutRequestService } from './workout-request.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WorkoutRequestModel,
  WorkoutRequestSchema,
} from './workout-request.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutRequestModel.name, schema: WorkoutRequestSchema },
    ]),
  ],
  controllers: [WorkoutRequestController],
  providers: [WorkoutRequestService],
})
export class WorkoutRequestModule {}
