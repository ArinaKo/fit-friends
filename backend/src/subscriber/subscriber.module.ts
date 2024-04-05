import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberRepository } from './subscriber.repository';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { SubscriberController } from './subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema },
    ]),
    UserModule,
    MailModule,
  ],
  controllers: [SubscriberController],
  providers: [SubscriberRepository, SubscriberService],
  exports: [SubscriberService],
})
export class SubscriberModule {}
