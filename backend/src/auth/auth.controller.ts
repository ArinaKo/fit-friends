import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { LoggedUserRdo } from './rdo/index';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFilter, ParseFile, Public } from '@app/core';
import {
  LocalAuthGuard,
  JwtRefreshGuard,
  NotAuthGuard,
} from 'src/shared/guards';
import {
  RequestWithUser,
  RequestWithTokenPayload,
  RequestWithRefreshTokenPayload,
} from '../shared/requests/index';
import { UserService } from 'src/user/user.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFile } from 'src/shared/const';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiConsumes('multipart/form-data')
  @Public()
  @UseGuards(NotAuthGuard)
  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: FileFilter(ImageFile.MimeTypes, ImageFile.MaxSize),
    }),
  )
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(ParseFile) avatar: Express.Multer.File,
  ) {
    return this.authService.register(dto, avatar);
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
  @ApiBody({ type: LoginUserDto })
  @Public()
  @UseGuards(NotAuthGuard, LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
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
    return this.userService.getUserByEmail(tokenPayload.email);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged out.',
  })
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Delete('logout')
  public async logout(@Req() { tokenPayload }: RequestWithRefreshTokenPayload) {
    await this.refreshTokenService.deleteRefreshSession(tokenPayload.tokenId);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Req() { tokenPayload }: RequestWithRefreshTokenPayload,
  ) {
    return this.authService.refreshUserToken(tokenPayload);
  }
}
