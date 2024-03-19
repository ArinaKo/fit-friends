import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto } from './dto/index';
import dayjs from 'dayjs';
import { UserMessage } from './user.const';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
      certificate,
      achievements,
      caloriesToLose,
      caloriesPerDay,
      timeForWorkout,
      password
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
      certificate,
      achievements,
      caloriesToLose,
      caloriesPerDay,
      timeForWorkout,
      passwordHash: '',
      createdAt: new Date()
    };
    const userEntity = await new UserEntity(newUser).setPassword(password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(UserMessage.NotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(UserMessage.PasswordWrong);
    }

    return existUser;
  }
}
