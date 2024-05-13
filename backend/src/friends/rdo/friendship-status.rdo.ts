import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FriendshipStatusRdo {
  @ApiProperty({
    description: 'Is user in friend?',
    example: 'true',
  })
  @Expose()
  public isFriend: boolean;
}
