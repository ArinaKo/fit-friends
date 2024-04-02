import { Entity } from '@app/core';
import { RequestStatus, WorkoutRequest } from '@app/types';

export class WorkoutRequestEntity implements WorkoutRequest, Entity<string> {
  public id?: string;
  public userFromId: string;
  public userToId: string;
  public status: RequestStatus;

  constructor(data: WorkoutRequest) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userFromId: this.userFromId,
      userToId: this.userToId,
      status: this.status,
    };
  }

  public populate(data: WorkoutRequest): void {
    this.id = data.id;
    this.userFromId = data.userFromId;
    this.userToId = data.userToId;
    this.status = data.status;
  }

  static fromObject(data: WorkoutRequest): WorkoutRequestEntity {
    return new WorkoutRequestEntity(data);
  }
}
