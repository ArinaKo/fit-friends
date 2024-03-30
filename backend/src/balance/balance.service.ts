import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { BalanceEntity } from './balance.entity';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly workoutService: WorkoutService,
  ) {}

  private async createBalance(
    userId: string,
    workoutId: string,
  ): Promise<BalanceEntity> {
    await this.workoutService.getWorkoutEntity(workoutId);

    const balanceEntity = BalanceEntity.fromObject({
      userId,
      workoutId,
      count: 0,
    });

    return this.balanceRepository.save(balanceEntity);
  }

  private async getBalance(
    userId: string,
    workoutId: string,
  ): Promise<BalanceEntity> {
    const existedRecord = await this.balanceRepository.findBalance(
      userId,
      workoutId,
    );

    if (existedRecord) {
      return existedRecord;
    }

    return this.createBalance(userId, workoutId);
  }

  public async increaseBalance(
    userId: string,
    workoutId: string,
    number: number,
  ) {
    const balance = await this.getBalance(userId, workoutId);
    balance.count += number;
    await this.balanceRepository.update(balance.id, balance);
  }
}
