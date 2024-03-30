import { Module } from '@nestjs/common';
import { UserBalanceController } from './user-balance.controller';
import { UserBalanceService } from './user-balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModel, BalanceSchema } from './balance.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceModel.name, schema: BalanceSchema },
    ]),
  ],
  controllers: [UserBalanceController],
  providers: [UserBalanceService],
})
export class UserBalanceModule {}
