import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModel, WorkoutSchema } from './workout.model';
import { WorkoutRepository } from './workout.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutModel.name, schema: WorkoutSchema },
    ]),
    UserModule,
  ],
  providers: [WorkoutRepository, WorkoutService],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
