import { Controller, HttpStatus, Post } from '@nestjs/common';
import { MockService } from './mock.service';
import { Public } from '@app/core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('mocks')
@Controller('mocks')
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
  }
}
