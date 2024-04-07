import { Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { MockService } from './mock.service';
import { Public } from '@app/core';
import { ApiResponse } from '@nestjs/swagger';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Mocks have been successfully created.',
  })
  @Public()
  @Post('/')
  public async index() {
    await this.mockService.generateMocks();
    Logger.log(`Mocks successfully generated`);
  }
}
