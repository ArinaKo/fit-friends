import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }
}
