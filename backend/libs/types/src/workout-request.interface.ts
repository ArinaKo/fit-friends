import { RequestStatus } from './request-status.enum';

export interface WorkoutRequest {
  id?: string;
  userFromId: string;
  userToId: string;
  status: RequestStatus;
}
