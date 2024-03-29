import {
  Body,
  Controller,
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
}
