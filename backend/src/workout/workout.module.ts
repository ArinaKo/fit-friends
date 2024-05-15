import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModel, WorkoutSchema } from './workout.model';
import { WorkoutRepository } from './workout.repository';
import { SubscriberModule } from 'src/subscriber/subscriber.module';
import { FileVaultModule } from 'src/file-vault/file-vault.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutModel.name, schema: WorkoutSchema },
    ]),
    SubscriberModule,
    FileVaultModule,
    UserModule,
  ],
  providers: [WorkoutRepository, WorkoutService],
  controllers: [WorkoutController],
  exports: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
