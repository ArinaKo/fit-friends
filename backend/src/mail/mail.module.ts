import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailOptions } from '@app/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MailerModule.forRootAsync(getMailOptions()), UserModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
