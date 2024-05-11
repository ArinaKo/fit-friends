import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { MongoIdValidationPipe, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { BalanceStatusRdo, BalancesWithPaginationRdo } from './rdo';
import { UserBalanceQuery } from './query';

@ApiTags('balances')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiResponse({
    type: BalancesWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'User balance',
  })
  @ApiQuery({ type: UserBalanceQuery })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Get('/')
  public async index(
    @Query() query: UserBalanceQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.balanceService.getUserBalances(tokenPayload.sub, query);
  }

  @ApiResponse({
    type: BalanceStatusRdo,
    status: HttpStatus.OK,
    description: 'Workout balance status',
  })
  @Get('/:workoutId')
  public async workoutBalance(
    @Param('workoutId', MongoIdValidationPipe) workoutId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.balanceService.getWorkoutBalance(tokenPayload.sub, workoutId);
  }

  @ApiResponse({
    type: BalanceStatusRdo,
    status: HttpStatus.OK,
    description: 'The balance has been successfully updated',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/decrease/:workoutId')
  public async decrease(
    @Param('workoutId', MongoIdValidationPipe) workoutId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.balanceService.decreaseBalance(tokenPayload.sub, workoutId);
  }
}
