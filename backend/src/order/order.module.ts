import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, OrderSchema } from './order.model';
import { OrderRepository } from './order.repository';
import { WorkoutModule } from 'src/workout/workout.module';
import { BalanceModule } from 'src/balance/balance.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
    WorkoutModule,
    BalanceModule,
  ],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
  exports: [OrderRepository],
})
export class OrderModule {}
