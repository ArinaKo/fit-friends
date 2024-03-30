import { Body, Controller, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { RequestWithTokenPayload } from 'src/requests';
import { DecreaseBalanceDto } from './dto';
import { Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/guards';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
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
