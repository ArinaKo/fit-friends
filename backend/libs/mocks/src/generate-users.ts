import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
  WorkoutDuration,
} from '@app/types';
import {
  generateDate,
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '@app/helpers';
import {
  UsersDescriptions,
  Emails,
  FemaleNames,
  MaleNames,
} from './mock-data';
import { CaloriesValue } from 'src/shared/const';

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
    description: getRandomItem(UsersDescriptions),
    location: getRandomItem(Object.values(MetroStation)),
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
      : generateRandomValue(CaloriesValue.Min, CaloriesValue.Max),
    caloriesPerDay: isCoach
      ? undefined
      : generateRandomValue(CaloriesValue.Min, CaloriesValue.Max),
    timeForWorkout: isCoach
      ? undefined
      : getRandomItem(Object.values(WorkoutDuration)),
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
