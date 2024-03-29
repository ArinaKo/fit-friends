import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
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
import { WorkoutsOrdersQuery } from './query';
import { OrdersWithPaginationRdo } from './rdo/orders-with-pagination.rdo';

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
    type: OrdersWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Coach workouts list',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Get('/')
  public async indexByCoach(
    @Query() query: WorkoutsOrdersQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    const ordersWithPagination = await this.orderService.getCoachOrders(
      tokenPayload.sub,
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
