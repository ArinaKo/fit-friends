import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { getMailOptions } from '@app/config';

@Module({
  imports: [MailerModule.forRootAsync(getMailOptions())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
