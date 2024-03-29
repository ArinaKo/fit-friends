import { Expose } from 'class-transformer';
import { WorkoutOrdersRdo } from './workout-orders.rdo';
import { BasePaginationRdo } from '@app/core';

export class OrdersWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public orders: WorkoutOrdersRdo[];
}