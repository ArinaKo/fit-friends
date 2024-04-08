import { RequestStatus } from '@app/types';
import { generateDate, getRandomItems } from '@app/helpers';
import { GeneratedDataAmount } from '../mock.const';
import { WorkoutRequestEntity } from 'src/workout-request/workout-request.entity';

function generateRequest(userToId: string) {
  return {
    userToId: userToId,
    status: RequestStatus.Default,
    createdAt: generateDate(),
  };
}

function generatesRequestsFromUser(
  userId: string,
  usersToIds: string[],
): WorkoutRequestEntity[] {
  return usersToIds.map((userToId: string) =>
    WorkoutRequestEntity.fromObject(
      Object.assign(generateRequest(userToId), { userFromId: userId }),
    ),
  );
}

export function generatesRequestsEntities(
  usersId: string[],
  allUsersIds: string[],
): WorkoutRequestEntity[] {
  return usersId
    .map((userId) =>
      generatesRequestsFromUser(
        userId,
        getRandomItems(
          allUsersIds.filter((id) => id !== userId),
          GeneratedDataAmount.WorkoutRequests,
        ),
      ),
    )
    .flat();
}
