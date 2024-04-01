import { Module } from '@nestjs/common';
import { WorkoutRequestController } from './workout-request.controller';
import { WorkoutRequestService } from './workout-request.service';

@Module({

  controllers: [WorkoutRequestController],
  providers: [WorkoutRequestService],
})
export class WorkoutRequestModule {}
