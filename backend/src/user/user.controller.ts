import { Body, Controller, Get, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { fillDto } from '@app/helpers';
import { FullUserRdo } from './rdo';
import { MongoIdValidationPipe, UserDtoValidationPipe } from '@app/core';
import { UpdateUserDto } from './dto';
import { AuthUserRdo } from 'src/auth/rdo';
import { UpdateUserDtoListing } from './user.const';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get('/:userId')
  public async show(@Param('userId', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getUserById(id);
    return fillDto(FullUserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.OK,
    description: 'User`s info has been successfully updated'
  })
  @Patch('/:userId')
  public async update(@Param('userId', MongoIdValidationPipe) id: string, @Body(new UserDtoValidationPipe(UpdateUserDtoListing)) dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, dto);
    return fillDto(AuthUserRdo, updatedUser.toPOJO());
  }
}
