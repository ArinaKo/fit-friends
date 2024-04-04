import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EmailSubject } from './mail.const';
import { CoachSubscription } from '@app/types';
import { mailConfig } from '@app/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  @Inject(mailConfig.KEY)
  private readonly mailConfig: ConfigType<typeof mailConfig>;

  public async sendNotifyNewSubscription(subscription: CoachSubscription) {
    const coachName = (
      await this.userService.getUserEntity(subscription.coachId)
    ).name;
    const userName = (
      await this.userService.getUserEntity(subscription.subscriber.userId)
    ).name;

    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: subscription.subscriber.email,
      subject: EmailSubject.NewSubscription,
      template: './new-subscription',
      context: {
        coachName,
        userName,
      },
    });
  }
}
