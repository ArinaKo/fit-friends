import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, OrderSchema } from './order.model';
import { OrderRepository } from './order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
  ],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
