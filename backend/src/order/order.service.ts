import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { WorkoutService } from 'src/workout/workout.service';
import { WorkoutsOrdersQuery } from './query';
import { OrdersWithPaginationRdo } from './rdo/orders-with-pagination.rdo';
import { fillDto } from '@app/helpers';
import { BalanceService } from 'src/balance/balance.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly workoutService: WorkoutService,
    private readonly balanceService: BalanceService,
  ) {}

  public async createOrder(dto: CreateOrderDto, userId: string) {
    const workout = await this.workoutService.getWorkoutEntity(dto.workoutId);

    const newOrder = OrderEntity.fromObject(
      Object.assign(dto, {
        userId,
        workoutPrice: workout.price,
        totalPrice: dto.count * workout.price,
      }),
    );

    await this.orderRepository.save(newOrder);
    await this.balanceService.increaseBalance(userId, dto.workoutId, dto.count);
  }

  public async getCoachOrders(
    coachId: string,
    query: WorkoutsOrdersQuery,
  ): Promise<OrdersWithPaginationRdo> {
    const ordersWithPagination = await this.orderRepository.find(
      coachId,
      query,
    );
    return fillDto(OrdersWithPaginationRdo, {
      ...ordersWithPagination,
      orders: ordersWithPagination.entities.map((workoutOrders) => ({
        ...workoutOrders,
        workout: workoutOrders.workout.toPOJO(),
      })),
    });
  }
}
