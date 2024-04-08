import { Expose } from 'class-transformer';
import { WorkoutOrdersRdo } from './workout-orders.rdo';
import { BasePaginationRdo } from '@app/core';
import { ApiProperty } from '@nestjs/swagger';

export class OrdersWithPaginationRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Workout`s orders list',
    type: [WorkoutOrdersRdo],
  })
  @Expose()
  public orders: WorkoutOrdersRdo[];
}
