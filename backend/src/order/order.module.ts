import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, OrderSchema } from './order.model';
import { OrderRepository } from './order.repository';
import { WorkoutModule } from 'src/workout/workout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
    WorkoutModule,
  ],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
