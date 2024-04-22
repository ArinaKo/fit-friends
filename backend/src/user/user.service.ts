import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CoachUserQuestionaryDto,
  DefaultUserQuestionaryDto,
  UpdateUserDto,
} from './dto';
import { UserEntity } from './user.entity';
import { UsersQuery } from './query';
import { AuthUserRdo, LoggedUserRdo } from 'src/auth/rdo';
import { fillDto } from '@app/helpers';
import { FullUserRdo, UserRdo, UsersWithPaginationRdo } from './rdo';
import { FileVaultService } from 'src/file-vault/file-vault.service';
import { FileRdo } from 'src/file-vault/rdo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileVaultService: FileVaultService,
  ) {}

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
    const existsUser = await this.userRepository.findFullUser(userId);

    if (!existsUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const user = existsUser.toPOJO();

    if (existsUser.certificates) {
      user.certificates = existsUser.certificates.map((entity) =>
        fillDto(FileRdo, entity.toPOJO()),
      );
    }

    return fillDto(FullUserRdo, user);
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

  public async completeCoachData(
    userId: string,
    dto: CoachUserQuestionaryDto,
    certificates: Array<Express.Multer.File>,
  ): Promise<void> {
    const existsUser = await this.getUserEntity(userId);

    for (const [key, value] of Object.entries(dto)) {
      if (
        value !== undefined &&
        existsUser[key] !== value &&
        key !== 'certificates'
      ) {
        existsUser[key] = value;
      }
    }

    const certificatesIds: string[] = [];
    await Promise.allSettled(
      certificates.map(async (certificate) => {
        const certificateId = (
          await this.fileVaultService.saveFile(certificate)
        ).id;
        certificatesIds.push(certificateId);
      }),
    );
    existsUser.certificates = certificatesIds;

    await this.userRepository.update(userId, existsUser);
  }

  public async completeDefaultUserData(
    userId: string,
    dto: DefaultUserQuestionaryDto,
  ): Promise<void> {
    const existsUser = await this.getUserEntity(userId);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsUser[key] !== value) {
        existsUser[key] = value;
      }
    }

    await this.userRepository.update(userId, existsUser);
  }

  public async updateUser(
    userId: string,
    dto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ): Promise<AuthUserRdo> {
    const existsUser = await this.getUserEntity(userId);

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (
        value !== undefined &&
        existsUser[key] !== value &&
        key !== 'avatar'
      ) {
        existsUser[key] = value;
        hasChanges = true;
      }
    }

    if (avatar) {
      const oldAvatar =
        typeof existsUser.avatar === 'string'
          ? existsUser.avatar
          : existsUser.avatar.id!;
      const newAvatar = await this.fileVaultService.saveFile(avatar);
      existsUser.avatar = newAvatar.id;
      hasChanges = true;

      this.fileVaultService.deleteFile(oldAvatar);
    }

    if (!hasChanges) {
      return fillDto(AuthUserRdo, existsUser.toPOJO());
    }

    await this.userRepository.update(userId, existsUser);

    const updatedUser = await this.userRepository.findFullUser(userId);
    return fillDto(AuthUserRdo, updatedUser!.toPOJO());
  }
}
