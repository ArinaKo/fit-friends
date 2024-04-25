import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutType,
  WorkoutDuration,
  FullUser,
} from '@app/types';
import {
  generateDate,
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '@app/helpers';
import { UsersDescriptions, Emails, FemaleNames, MaleNames } from './mock-data';
import { CaloriesValue, MAX_WORKOUTS_TYPES } from 'src/shared/const';
import { UserEntity } from 'src/user/user.entity';
import { DEFAULT_PASSWORD, GeneratedDataAmount } from '../mock.const';

function generateUser(isMale: boolean, isCoach: boolean) {
  return {
    name: getRandomItem(isMale ? MaleNames : FemaleNames),
    sex: isMale ? UserSex.Male : UserSex.Female,
    dateOfBirth: new Date(generateDate()),
    role: isCoach ? UserRole.Coach : UserRole.Default,
    description: getRandomItem(UsersDescriptions),
    location: getRandomItem(Object.values(MetroStation)),
    level: getRandomItem(Object.values(UserLevel)),
    workoutTypes: getRandomItems(
      Object.values(WorkoutType),
      MAX_WORKOUTS_TYPES,
    ),
    isReady: Boolean(generateRandomValue(0, 1)),
    achievements: isCoach ? 'Я отличный тренер' : undefined,
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

function generateUsers(
  avatarsIds: string[],
  certificateIds: string[],
): FullUser[] {
  return [...Emails].map((_, index) => {
    const avatar = getRandomItem(avatarsIds);
    const isMale = index % 2 === 0;
    const isCoach = index < GeneratedDataAmount.Coaches;
    const certificates = isCoach ? [getRandomItem(certificateIds)] : undefined;
    return Object.assign(generateUser(isMale, isCoach), {
      email: Emails[index],
      avatar,
      backgroundImage: avatar,
      certificates,
    });
  });
}

export async function generateUsersEntities(
  avatarsIds: string[],
  certificateIds: string[],
): Promise<UserEntity[]> {
  return Promise.all(
    generateUsers(avatarsIds, certificateIds).map(
      async (user) => await new UserEntity(user).setPassword(DEFAULT_PASSWORD),
    ),
  );
}
