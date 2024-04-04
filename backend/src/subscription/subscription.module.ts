import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionModel, SubscriptionSchema } from './subscription.model';
import { SubscriptionRepository } from './subscription.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionModel.name, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionRepository, SubscriptionService],
})
export class SubscriptionModule {}
