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
import { CreateCoachUserDto, CreateUserDto, LoginUserDto } from './dto/index';
import * as dayjs from 'dayjs';
import { FileMessage, UserMessage } from 'src/shared/messages';
import { RefreshTokenPayload } from '@app/types';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '@app/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { createJWTPayload, fillDto } from '@app/helpers';
import { UserService } from 'src/user/user.service';
import { AuthUserRdo, LoggedUserRdo } from './rdo';
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

  public async register(dto: CreateUserDto): Promise<AuthUserRdo> {
    const {
      email,
      name,
      avatar,
      sex,
      dateOfBirth,
      role,
      description,
      location,
      level,
      workoutTypes,
      isReady,
      password,
    } = dto;

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
      dateOfBirth: dateOfBirth ? dayjs(dateOfBirth).toDate() : undefined,
      role,
      description,
      location,
      backgroundImage: dto.backgroundImage ?? avatar,
      level,
      workoutTypes,
      isReady,
      passwordHash: '',
      createdAt: new Date(),
    };

    let extraInfo = {};
    if (dto instanceof CreateCoachUserDto) {
      if (!(await this.fileVaultService.isFileDocument(dto.certificate))) {
        throw new BadRequestException(FileMessage.UploadedDocumentType);
      }
      extraInfo = {
        certificate: dto.certificate,
        achievements: dto.achievements,
      };
    } else {
      extraInfo = {
        caloriesToLose: dto.caloriesToLose,
        caloriesPerDay: dto.caloriesPerDay,
        timeForWorkout: dto.timeForWorkout,
      };
    }

    const userEntity = await new UserEntity(
      Object.assign(userInfo, extraInfo),
    ).setPassword(password);

    const userId = (await this.userRepository.save(userEntity)).id!;
    const fullUser = await this.userRepository.findFullUser(userId);
    return fillDto(AuthUserRdo, fullUser!.toPOJO());
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
