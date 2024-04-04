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

  public async sendNotifyNewCoachSubscription(coachId: string, userId: string) {
    const coachName = (
      await this.userService.getUserEntity(coachId)
    ).name;
    const user = await this.userService.getUserEntity(userId);

    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: user.email,
      subject: EmailSubject.NewSubscription,
      template: './new-subscription',
      context: {
        coachName,
        userName: user.name,
      },
    });
  }
}
