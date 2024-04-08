import { Expose } from 'class-transformer';
import { BalanceRdo } from './balance.rdo';
import { BasePaginationRdo } from '@app/core';
import { ApiProperty } from '@nestjs/swagger';

export class BalancesWithPaginationRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Balances list',
    type: [BalanceRdo],
  })
  @Expose()
  public balances: BalanceRdo[];
}
