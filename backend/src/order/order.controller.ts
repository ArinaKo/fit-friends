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
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { CreateOrderDto } from './dto';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { WorkoutsOrdersQuery } from './query';
import { OrdersWithPaginationRdo } from './rdo/orders-with-pagination.rdo';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created',
  })
  @ApiBody({ type: CreateOrderDto })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateOrderDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.orderService.createOrder(dto, tokenPayload.sub);
  }

  @ApiResponse({
    type: OrdersWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Coach workout`s orders list',
  })
  @ApiQuery({ type: WorkoutsOrdersQuery })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Get('/my-orders')
  public async indexByCoach(
    @Query() query: WorkoutsOrdersQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.orderService.getCoachOrders(tokenPayload.sub, query);
  }
}
