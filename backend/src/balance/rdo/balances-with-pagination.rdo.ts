import { Expose } from 'class-transformer';
import { BalanceRdo } from './balance.rdo';
import { BasePaginationRdo } from '@app/core';

export class BalancesWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public balances: BalanceRdo[];
}
