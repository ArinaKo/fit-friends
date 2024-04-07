import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateCoachUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { UsersQuery } from './query';
import { AuthUserRdo, LoggedUserRdo } from 'src/auth/rdo';
import { fillDto } from '@app/helpers';
import { FullUserRdo, UserRdo, UsersWithPaginationRdo } from './rdo';
import { FileVaultService } from 'src/file-vault/file-vault.service';
import { FileMessage } from 'src/shared/messages';

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

    if (dto.avatar && !(await this.fileVaultService.isFileImage(dto.avatar))) {
      throw new BadRequestException(FileMessage.UploadedImageType);
    }

    if (
      dto.backgroundImage &&
      !(await this.fileVaultService.isFileImage(dto.backgroundImage))
    ) {
      throw new BadRequestException(FileMessage.UploadedImageType);
    }

    if (
      dto instanceof UpdateCoachUserDto &&
      dto.certificate &&
      !(await this.fileVaultService.isFileDocument(dto.certificate))
    ) {
      throw new BadRequestException(FileMessage.UploadedDocumentType);
    }

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

    await this.userRepository.update(userId, existsUser);

    const updatedUser = await this.userRepository.findFullUser(userId);
    return fillDto(AuthUserRdo, updatedUser!.toPOJO());
  }
}
