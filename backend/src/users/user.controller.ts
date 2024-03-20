import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { fillDto } from '@app/helpers';
import { FullUserRdo, LoggedUserRdo } from './rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(FullUserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.userService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }
}
