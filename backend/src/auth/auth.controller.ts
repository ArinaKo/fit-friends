import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';
import { fillDto } from '@app/helpers';
import { AuthUserRdo, LoggedUserRdo } from './rdo/index';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDtoValidationPipe } from '@app/core';
import { CreateUserDtoListing } from './auth.const';
import { Public } from '@app/core/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { UserService } from 'src/user/user.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RequestWithUser } from './requests/request-with-user.interface';
import { RequestWithTokenPayload } from './requests/request-with-token-payload.interface';
import { RequestWithRefreshTokenPayload } from './requests/request-with-refresh-token-payload.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Public()
  @UseGuards(NotAuthGuard)
  @Post('register')
  public async create(
    @Body(new UserDtoValidationPipe(CreateUserDtoListing)) dto: CreateUserDto,
  ) {
    const newUser = await this.authService.register(dto);
    return fillDto(AuthUserRdo, newUser.toPOJO());
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
  @Public()
  @UseGuards(NotAuthGuard, LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User is authorized.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized.',
  })
  @Get('login')
  public async checkAuth(@Req() { tokenPayload }: RequestWithTokenPayload) {
    const user = await this.userService.getUserByEmail(tokenPayload.email);
    return fillDto(LoggedUserRdo, user.toPOJO());
  }
  
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged out.',
  })
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Delete('logout')
  public async logout(@Req() { tokenPayload }: RequestWithRefreshTokenPayload) {
    const user = await this.refreshTokenService.deleteRefreshSession(tokenPayload.tokenId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { tokenPayload }: RequestWithRefreshTokenPayload) {
    return this.authService.refreshUserToken(tokenPayload);
  }
}
