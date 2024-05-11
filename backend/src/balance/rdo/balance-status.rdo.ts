import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BalanceStatusRdo {
  @ApiProperty({
    description: 'Workout balance status',
    example: '2',
  })
  @Expose()
  public count: number | null;
}
