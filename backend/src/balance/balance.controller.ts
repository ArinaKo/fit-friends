import { Body, Controller, Get, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { RequestWithTokenPayload } from 'src/requests';
import { DecreaseBalanceDto } from './dto';
import { Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/guards';
import { BalanceRdo } from './rdo/balance.rdo';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiResponse({
    type: [BalanceRdo],
    status: HttpStatus.OK,
    description: 'User balance',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Get('/')
  public async index(
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.balanceService.getUserBalance(tokenPayload.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The balance has been successfully updated',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/decrease')
  public async decreaseBalance(
    @Body() dto: DecreaseBalanceDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    this.balanceService.decreaseBalance(tokenPayload.sub, dto.workoutId);
  }
}
