import { UserRole } from "./user-role.enum";

export type LoggedUser = {
  id: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}
