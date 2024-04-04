import { Module } from '@nestjs/common';
import { CoachSubscriptionService } from './coach-subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CoachSubscriptionModel,
  CoachSubscriptionSchema,
} from './coach-subscription.model';
import { CoachSubscriptionRepository } from './coach-subscription.repository';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { CoachSubscriptionController } from './coach-subscription.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CoachSubscriptionModel.name, schema: CoachSubscriptionSchema },
    ]),
    UserModule,
    MailModule,
  ],
  controllers: [CoachSubscriptionController],
  providers: [CoachSubscriptionRepository, CoachSubscriptionService],
})
export class CoachSubscriptionModule {}
