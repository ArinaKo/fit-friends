import { Module } from '@nestjs/common';
import { CoachSubscriptionService } from './coach-subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CoachSubscriptionModel,
  CoachSubscriptionSchema,
} from './coach-subscription.model';
import { CoachSubscriptionRepository } from './coach-subscription.repository';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CoachSubscriptionModel.name, schema: CoachSubscriptionSchema },
    ]),
    UserService,
  ],
  providers: [CoachSubscriptionRepository, CoachSubscriptionService],
})
export class CoachSubscriptionModule {}
