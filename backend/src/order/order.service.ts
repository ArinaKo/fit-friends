import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { WorkoutService } from 'src/workout/workout.service';
import { WorkoutOrdersEntity } from './workout-orders.entity';
import { WorkoutsOrdersQuery } from './query';
import { PaginationResult } from '@app/core';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly workoutService: WorkoutService,
  ) {}

  public async createOrder(dto: CreateOrderDto, userId: string) {
    await this.workoutService.getWorkout(dto.workoutId);

    const newOrder = OrderEntity.fromObject(
      Object.assign(dto, { userId, totalPrice: dto.count * dto.workoutPrice }),
    );

    await this.orderRepository.save(newOrder);
  }

  public async getCoachOrders(
    coachId: string,
    query: WorkoutsOrdersQuery,
  ): Promise<PaginationResult<WorkoutOrdersEntity>> {
    return this.orderRepository.find(coachId, query);
  }
}
