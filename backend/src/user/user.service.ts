import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { UsersQuery } from './query';
import { AuthUserRdo, LoggedUserRdo } from 'src/auth/rdo';
import { fillDto } from '@app/helpers';
import { FullUserRdo, UserRdo, UsersWithPaginationRdo } from './rdo';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserByEmail(email: string): Promise<LoggedUserRdo> {
    const existsUser = await this.userRepository.findByEmail(email);

    if (!existsUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return fillDto(LoggedUserRdo, existsUser.toPOJO());
  }

  public async getUserEntity(userId: string): Promise<UserEntity> {
    const existsUser = await this.userRepository.findById(userId);

    if (!existsUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return existsUser;
  }

  public async getFullUser(userId: string): Promise<FullUserRdo> {
    const existsUser = await this.getUserEntity(userId);
    return fillDto(FullUserRdo, existsUser.toPOJO());
  }

  public async getAllUsers(
    query?: UsersQuery,
  ): Promise<UsersWithPaginationRdo> {
    const usersWithPagination = await this.userRepository.find(query);
    return fillDto(UsersWithPaginationRdo, {
      ...usersWithPagination,
      users: usersWithPagination.entities.map((entity) =>
        fillDto(UserRdo, entity.toPOJO()),
      ),
    });
  }

  public async updateUser(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<AuthUserRdo> {
    const existsUser = await this.getUserEntity(userId);

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsUser[key] !== value) {
        existsUser[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return fillDto(AuthUserRdo, existsUser.toPOJO());
    }

    const updatedUser = await this.userRepository.update(userId, existsUser);
    return fillDto(AuthUserRdo, updatedUser.toPOJO());
  }
}
