import { UserRole } from "@app/types";
import { CreateCoachUserDto, CreateDefaultUserDto } from "./dto";

export const CreateUserDtoListing = {
  [UserRole.Default]: CreateDefaultUserDto,
  [UserRole.Coach]: CreateCoachUserDto,
};
