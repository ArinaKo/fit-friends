import { ConflictException, Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { BalanceEntity } from './balance.entity';
import { WorkoutService } from 'src/workout/workout.service';
import { fillDto } from '@app/helpers';
import { BalanceStatusRdo, BalancesWithPaginationRdo } from './rdo';
import { UserBalanceQuery } from './query';

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

  public async getWorkoutBalance(
    userId: string,
    workoutId: string,
  ): Promise<BalanceStatusRdo> {
    const balance = await this.balanceRepository.findBalance(userId, workoutId);
    return { count: balance ? balance.count : balance };
  }

  public async getUserBalances(
    userId: string,
    query?: UserBalanceQuery,
  ): Promise<BalancesWithPaginationRdo> {
    const balancesWithPagination = await this.balanceRepository.find(
      userId,
      query,
    );

    return fillDto(BalancesWithPaginationRdo, {
      ...balancesWithPagination,
      balances: balancesWithPagination.entities.map((balance) => ({
        ...balance,
        workout: balance.workout.toPOJO(),
      })),
    });
  }

  public async increaseBalance(
    userId: string,
    workoutId: string,
    number: number,
  ) {
    const balance = await this.getBalance(userId, workoutId);
    balance.count = balance.count + number;
    await this.balanceRepository.update(balance.id, balance);
  }

  public async decreaseBalance(
    userId: string,
    workoutId: string,
  ): Promise<BalanceStatusRdo> {
    const balance = await this.getBalance(userId, workoutId);

    if (!balance.count) {
      throw new ConflictException(
        `Balance of workout with id ${workoutId} is 0`,
      );
    }
    balance.count = balance.count - 1;
    await this.balanceRepository.update(balance.id, balance);
    return { count: balance.count };
  }
}
