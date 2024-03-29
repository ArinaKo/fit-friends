import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { WorkoutService } from 'src/workout/workout.service';

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
}
