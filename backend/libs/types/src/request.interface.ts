import { RequestStatus } from './request-status.enum';

export interface Request {
  userFromId: string;
  userToId: string;
  status: RequestStatus;
  createdAt: Date;
  updatedAt?: Date;
}
