import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModel, BalanceSchema } from './balance.model';
import { BalanceRepository } from './balance.repository';
import { WorkoutModule } from 'src/workout/workout.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceModel.name, schema: BalanceSchema },
    ]),
    WorkoutModule,
  ],
  controllers: [BalanceController],
  providers: [BalanceRepository, BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
