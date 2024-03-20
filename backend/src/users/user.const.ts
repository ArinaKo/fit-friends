import { UserRole } from "@app/types";
import { CreateCoachUserDto, CreateDefaultUserDto } from "./dto";

export const SALT_ROUNDS = 10;

export const UserMessage = {
  Exists: 'User with this email exists',
  NotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
};

export const CreateUserDtoListing = {
  [UserRole.Default]: CreateDefaultUserDto,
  [UserRole.Coach]: CreateCoachUserDto,
};
