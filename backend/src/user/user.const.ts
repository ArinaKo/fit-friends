import { UserRole } from '@app/types';
import { UpdateCoachUserDto, UpdateDefaultUserDto } from './dto';

export const SALT_ROUNDS = 10;

export const UpdateUserDtoListing = {
  [UserRole.Default]: UpdateDefaultUserDto,
  [UserRole.Coach]: UpdateCoachUserDto,
};
