import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { fillDto } from '@app/helpers';
import { FullUserRdo, LoggedUserRdo } from './rdo';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(FullUserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.userService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }
}
