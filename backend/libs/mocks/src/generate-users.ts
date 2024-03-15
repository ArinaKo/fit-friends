import {
  Location,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
} from '@app/types';
import { generateDate, generateRandomValue, getRandomItem, getRandomItems } from '@app/helpers';
import {
  Descriptions,
  Emails,
  FemaleNames,
  MaleNames,
  UsersIds,
} from './mock-data';

const AVATARS_NUMBER = 5;
const WORKOUT_TYPES_NUMBER = 3;

function generateUser(isMale: boolean) {
  return {
    name: getRandomItem(isMale ? MaleNames : FemaleNames),
    avatar: `photo-${generateRandomValue(1, AVATARS_NUMBER)}.png`,
    sex: isMale ? UserSex.Male : UserSex.Female,
    dateOfBirth: generateDate(),
    role: getRandomItem(Object.values(UserRole)),
    description: getRandomItem(Descriptions),
    location: getRandomItem(Object.values(Location)),
    level: getRandomItem(Object.values(UserLevel)),
    workoutTypes: getRandomItems(
      Object.values(WorkoutType),
      WORKOUT_TYPES_NUMBER,
    ),
    isReady: Boolean(generateRandomValue(0, 1)),
    createdAt: generateDate(),
  };
}

export function generateUsers(count: number) {
  return Array.from({ length: count }).forEach((user, index) =>
    Object.assign(generateUser(index % 2 === 0), {
      id: UsersIds[index],
      email: Emails[index],
    }),
  );
}
