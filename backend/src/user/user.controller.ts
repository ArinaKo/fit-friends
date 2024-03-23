import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { fillDto } from '@app/helpers';
import { FullUserRdo } from './rdo';
import { MongoIdValidationPipe } from '@app/core';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':userId')
  public async show(@Param('userId', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getUserById(id);
    return fillDto(FullUserRdo, existUser.toPOJO());
  }
}
