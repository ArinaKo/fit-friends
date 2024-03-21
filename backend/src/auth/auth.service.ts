import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { UserEntity } from '../users/user.entity';
import {
  CreateCoachUserDto,
  CreateDefaultUserDto,
  CreateUserDto,
  LoginUserDto,
} from './dto/index';
import dayjs from 'dayjs';
import { UserMessage } from '@app/messages';
import { Token, TokenPayload, User, UserRole } from '@app/types';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '@app/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async register(dto: CreateUserDto) {
    const {
      email,
      name,
      avatar,
      sex,
      dateOfBirth,
      role,
      description,
      location,
      backgroundImage,
      level,
      workoutTypes,
      isReady,
      password,
    } = dto;

    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserMessage.Exists);
    }

    const newUser = {
      email,
      name,
      avatar,
      sex,
      dateOfBirth: dateOfBirth ? dayjs(dateOfBirth).toDate() : undefined,
      role,
      description,
      location,
      backgroundImage: backgroundImage ?? avatar,
      level,
      workoutTypes,
      isReady,
      passwordHash: '',
      createdAt: new Date(),
    };

    const defaultUserInfo =
      role === UserRole.Default && dto instanceof CreateDefaultUserDto
        ? {
            caloriesToLose: dto.caloriesToLose,
            caloriesPerDay: dto.caloriesPerDay,
            timeForWorkout: dto.timeForWorkout,
          }
        : {};

    const coachUserInfo =
      role === UserRole.Coach && dto instanceof CreateCoachUserDto
        ? {
            certificate: dto.certificate,
            achievements: dto.achievements,
          }
        : {};

    const userEntity = await new UserEntity(
      Object.assign(newUser, defaultUserInfo, coachUserInfo),
    ).setPassword(password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
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

  public async createUserToken(user: UserEntity): Promise<Token> {
    const payload: TokenPayload = {
      id: user.id!,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      isReady: user.isReady,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
