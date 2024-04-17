import { UserRole } from "../const";

export type LoggedUser = {
  id: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}
