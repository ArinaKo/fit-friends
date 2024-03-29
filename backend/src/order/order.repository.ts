import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { OrderEntity } from './order.entity';
import { OrderModel } from './order.model';

@Injectable()
export class OrderRepository extends BaseMongoRepository<
  OrderEntity,
  OrderModel
> {
  constructor(@InjectModel(OrderModel.name) OrderModel: Model<OrderModel>) {
    super(OrderModel, OrderEntity.fromObject);
  }
}
