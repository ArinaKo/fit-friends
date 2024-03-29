import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiResponse } from '@nestjs/swagger';
import { Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/guards';
import { CreateOrderDto } from './dto';
import { RequestWithTokenPayload } from 'src/requests';
import { fillDto } from '@app/helpers';
import { WorkoutOrdersRdo } from './rdo';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateOrderDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    const newOrder = await this.orderService.createOrder(dto, tokenPayload.sub);
  }

  @ApiResponse({
    type: WorkoutOrdersRdo,
    status: HttpStatus.OK,
    description: 'Coach workouts list',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Get('/')
  public async indexByCoach(@Req() { tokenPayload }: RequestWithTokenPayload) {
    const workoutsOrders = await this.orderService.getCoachOrders(
      tokenPayload.sub,
    );
    return fillDto(
      WorkoutOrdersRdo,
      workoutsOrders.map((workoutOrders) => ({
        ...workoutOrders,
        workout: workoutOrders.workout.toPOJO(),
      })),
    );
  }
}
