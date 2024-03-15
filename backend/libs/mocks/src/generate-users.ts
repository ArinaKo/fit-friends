import {
  Location,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
  WorkoutsDurations,
} from '@app/types';
import {
  generateDate,
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '@app/helpers';
import {
  Descriptions,
  Emails,
  FemaleNames,
  MaleNames,
} from './mock-data';

const AVATARS_NUMBER = 5;
const COACHES_NUMBER = 4;
const CERTIFICATES_NUMBER = 5;
const WORKOUT_TYPES_NUMBER = 3;

function generateUser(isMale: boolean, isCoach: boolean) {
  return {
    name: getRandomItem(isMale ? MaleNames : FemaleNames),
    avatar: `photo-${generateRandomValue(1, AVATARS_NUMBER)}.png`,
    sex: isMale ? UserSex.Male : UserSex.Female,
    dateOfBirth: generateDate(),
    role: isCoach ? UserRole.Coach : UserRole.Default,
    description: getRandomItem(Descriptions),
    location: getRandomItem(Object.values(Location)),
    level: getRandomItem(Object.values(UserLevel)),
    workoutTypes: getRandomItems(
      Object.values(WorkoutType),
      WORKOUT_TYPES_NUMBER,
    ),
    isReady: Boolean(generateRandomValue(0, 1)),
    createdAt: generateDate(),
    certificate: isCoach
      ? `certificate-${generateRandomValue(1, CERTIFICATES_NUMBER)}.jpg`
      : undefined,
    achievements: isCoach ? '' : undefined,
    caloriesToLose: isCoach
      ? undefined
      : generateRandomValue(1, AVATARS_NUMBER),
    caloriesPerDay: isCoach
      ? undefined
      : generateRandomValue(1, AVATARS_NUMBER),
    timeForWorkout: isCoach
      ? undefined
      : getRandomItem(Object.keys(WorkoutsDurations)),
  };
}

export function generateUsers() {
  return Array.from({ length: Emails.length }).forEach((_, index) => 
    Object.assign(
      generateUser(index % 2 === 0, index < COACHES_NUMBER),
      {
        email: Emails[index],
      },
    )
  );
}
