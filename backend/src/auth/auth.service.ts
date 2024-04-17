import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { FileMessage, UserMessage } from 'src/shared/messages';
import { RefreshTokenPayload, UserLevel } from '@app/types';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '@app/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { createJWTPayload, fillDto } from '@app/helpers';
import { UserService } from 'src/user/user.service';
import { LoggedUserRdo } from './rdo';
import { FileVaultService } from 'src/file-vault/file-vault.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly fileVaultService: FileVaultService,
  ) {}

  public async register(dto: CreateUserDto): Promise<LoggedUserRdo> {
    const { email, name, avatar, sex, dateOfBirth, role, location, password } =
      dto;

    if (await this.userRepository.findByEmail(email)) {
      throw new ConflictException(UserMessage.Exists);
    }

    if (!(await this.fileVaultService.isFileImage(avatar))) {
      throw new BadRequestException(FileMessage.UploadedImageType);
    }

    if (
      dto.backgroundImage &&
      !(await this.fileVaultService.isFileImage(dto.backgroundImage))
    ) {
      throw new BadRequestException(FileMessage.UploadedImageType);
    }

    const userInfo = {
      email,
      name,
      avatar,
      sex,
      dateOfBirth: dateOfBirth ? dateOfBirth : undefined,
      role,
      location,
      backgroundImage: dto.backgroundImage ?? avatar,
      level: UserLevel.Amateur,
      workoutTypes: [],
      isReady: false,
      passwordHash: '',
      createdAt: new Date(),
    };

    const userEntity = await new UserEntity(
      Object.assign(userInfo),
    ).setPassword(password);
    console.log(userEntity);
    await this.userRepository.save(userEntity);

    return this.createUserToken(userEntity);
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(UserMessage.NotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(UserMessage.PasswordWrong);
    }

    return existUser;
  }

  public async refreshUserToken(
    payload: RefreshTokenPayload,
  ): Promise<LoggedUserRdo> {
    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    const user = await this.userService.getUserEntity(payload.sub);
    return this.createUserToken(user);
  }

  public async createUserToken(user: UserEntity): Promise<LoggedUserRdo> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        },
      );

      return fillDto(LoggedUserRdo, {
        ...user.toPOJO(),
        accessToken,
        refreshToken,
      });
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
