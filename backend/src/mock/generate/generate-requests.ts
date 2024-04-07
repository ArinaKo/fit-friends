import { RequestStatus } from '@app/types';
import { generateDate, getRandomItem } from '@app/helpers';

const REQUESTS_NUMBER = 3;

function generateRequest(usersIds: string[]) {
  return {
    userToId: getRandomItem(usersIds),
    status: RequestStatus.Default,
    createdAt: generateDate(),
  };
}

export function generatesRequests(userId: string, otherUsersIds: string[]) {
  return Array.from({ length: REQUESTS_NUMBER }).forEach(() =>
    Object.assign(generateRequest(otherUsersIds), { userFromId: userId }),
  );
}
