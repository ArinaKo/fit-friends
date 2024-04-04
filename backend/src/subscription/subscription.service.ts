import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionEntity } from './subscription.entity';
import { TokenPayload } from '@app/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userService: UserService,
  ) {}

  public async createSubscription(coachId: string, tokenPayload: TokenPayload): Promise<void> {
    await this.userService.getUserEntity(coachId);

    const { sub, email } = tokenPayload;

    const existsSubscription = await this.subscriptionRepository.findByUsersIds(
      sub,
      coachId,
    );

    if (existsSubscription) {
      throw new BadRequestException(
        'You are already coach`s workouts subscriber',
      );
    }

    const newSubscription = new SubscriptionEntity({
      coachId,
      subscriber: { userId: sub, email },
    });

    this.subscriptionRepository.save(newSubscription);
  }

  public async deleteSubscription(coachId: string, userId: string): Promise<void> {
    const existsSubscription = await this.subscriptionRepository.findByUsersIds(
      userId,
      coachId,
    );

    if (!existsSubscription) {
      throw new BadRequestException(
        'You are not coach`s workouts subscriber',
      );
    }

    this.subscriptionRepository.deleteByUsersIds(userId, coachId);
  }
}
