import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EmailSubject } from './mail.const';
import { mailConfig } from '@app/config';
import { UserService } from 'src/user/user.service';
import { WorkoutNotification } from '@app/types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  @Inject(mailConfig.KEY)
  private readonly mailConfig: ConfigType<typeof mailConfig>;

  public async sendNotifyNewSubscription(coachId: string, userId: string) {
    const { name: coachName } = await this.userService.getUserEntity(coachId);
    const { email, name: userName } =
      await this.userService.getUserEntity(userId);

    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: email,
      subject: EmailSubject.NewSubscription,
      template: './new-subscription',
      context: {
        coachName,
        userName,
      },
    });
  }

  public async sendNotifyNewWorkout(email: string, userName: string, notification: WorkoutNotification) {
    const { title, type, description, calories, coachName } = notification;

    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: email,
      subject: EmailSubject.NewWorkout,
      template: './new-workout',
      context: {
        userName,
        coachName,
        title, type, description, calories,
      },
    });
  }
}
