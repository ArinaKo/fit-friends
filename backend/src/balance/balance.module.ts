import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModel, BalanceSchema } from './balance.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceModel.name, schema: BalanceSchema },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
