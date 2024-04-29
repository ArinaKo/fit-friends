import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CoachUserQuestionaryDto,
  DefaultUserQuestionaryDto,
  UpdateUserDto,
} from './dto';
import { UserEntity } from './user.entity';
import { UsersQuery } from './query';
import { LoggedUserRdo } from 'src/auth/rdo';
import { fillDto } from '@app/helpers';
import {
  FullUserRdo,
  UserRdo,
  AuthUserRdo,
  UsersWithPaginationRdo,
} from './rdo';
import { FileVaultService } from 'src/file-vault/file-vault.service';
import { FileRdo } from 'src/file-vault/rdo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileVaultService: FileVaultService,
  ) {}

  private async getUserCertificates(userId: string): Promise<string[]> {
    const result = await this.userRepository.findUserCertificates(userId);

    if (result === null) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    if (result === undefined) {
      throw new BadRequestException(
        'Certificates can be updated only by coach',
      );
    }

    return result;
  }

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

  public async getAuthUser(userId: string): Promise<FullUserRdo> {
    const existsUser = await this.userRepository.findFullUser(userId);

    if (!existsUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return fillDto(AuthUserRdo, existsUser.toPOJO());
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
        ).id!;
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

    if (dto.avatar !== undefined) {
      existsUser.avatar = null;
      hasChanges = true;
    }

    if (avatar) {
      const newAvatar = await this.fileVaultService.saveFile(avatar);
      existsUser.avatar = newAvatar.id;
      hasChanges = true;
    }

    if (!hasChanges) {
      return fillDto(AuthUserRdo, existsUser.toPOJO());
    }

    await this.userRepository.update(userId, existsUser);

    const updatedUser = await this.userRepository.findFullUser(userId);
    return fillDto(AuthUserRdo, updatedUser!.toPOJO());
  }

  public async uploadCertificate(
    userId: string,
    certificateFile: Express.Multer.File,
  ): Promise<FileRdo> {
    const certificates = await this.getUserCertificates(userId);
    const existsUser = await this.getUserEntity(userId);

    const certificate = await this.fileVaultService.saveFile(certificateFile);
    existsUser.certificates = [certificate.id!, ...certificates];

    await this.userRepository.update(userId, existsUser);
    return fillDto(FileRdo, certificate);
  }

  public async updateCertificate(
    userId: string,
    oldCertificateId: string,
    newCertificate: Express.Multer.File,
  ): Promise<FileRdo> {
    const certificates = await this.getUserCertificates(userId);
    const existsUser = await this.getUserEntity(userId);

    if (!certificates.includes(oldCertificateId)) {
      throw new BadRequestException(`Certificate with id ${userId} not found`);
    }

    const certificate = await this.fileVaultService.saveFile(newCertificate);
    existsUser.certificates = certificates.map((item) =>
      item === oldCertificateId ? certificate.id! : item,
    );

    await this.userRepository.update(userId, existsUser);
    return fillDto(FileRdo, certificate);
  }

  public async deleteCertificate(
    userId: string,
    certificateId: string,
  ): Promise<void> {
    const certificates = await this.getUserCertificates(userId);
    const existsUser = await this.getUserEntity(userId);

    if (!certificates.includes(certificateId)) {
      throw new BadRequestException(`Certificate with id ${userId} not found`);
    }

    existsUser.certificates = certificates.filter(
      (item) => item !== certificateId,
    );

    this.userRepository.update(userId, existsUser);
  }
}
