import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { fillDto } from '@app/helpers';
import { FullUserRdo, LoggedUserRdo } from '../users/rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDtoValidationPipe } from '@app/core';
import { CreateUserDtoListing } from './auth.const';
import { Public } from '@app/core/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async create(@Body(new UserDtoValidationPipe(CreateUserDtoListing)) dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(FullUserRdo, newUser.toPOJO());
  }

  @Public()
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
    const verifiedUser = await this.authService.verifyUser(dto);
    const userToken = await this.authService.createUserToken(verifiedUser);
    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
  }
}
