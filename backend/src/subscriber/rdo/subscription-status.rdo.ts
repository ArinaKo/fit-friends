import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubscriptionStatusRdo {
  @ApiProperty({
    description: 'Is user subscribe to a coach?',
    example: 'true',
  })
  @Expose()
  public subscriptionStatus: boolean;
}
