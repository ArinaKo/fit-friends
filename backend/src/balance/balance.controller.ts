import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { DecreaseBalanceDto } from './dto';
import { Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { BalancesWithPaginationRdo } from './rdo';
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
    return this.balanceService.getUserBalance(tokenPayload.sub, query);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The balance has been successfully updated',
  })
  @ApiBody({ type: DecreaseBalanceDto })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/decrease')
  public async decrease(
    @Body() dto: DecreaseBalanceDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.balanceService.decreaseBalance(tokenPayload.sub, dto.workoutId);
  }
}
