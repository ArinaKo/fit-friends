import {
  UserLevel,
  WorkoutType,
  WorkoutDuration,
  WorkoutSexFor,
} from '@app/types';
import { generateRandomValue, getRandomItem } from '@app/helpers';
import { CaloriesValue, DEFAULT_RATING } from 'src/shared/const';
import { WorkoutsDescriptions, WorkoutsTitles } from './mock-data';
import { WORKOUT_IMAGES_COUNT } from 'src/workout/workout.const';
import { WorkoutEntity } from 'src/workout/workout.entity';
import { GeneratedDataAmount, MAX_PRICE } from '../mock.const';

function generateWorkout() {
  return {
    title: getRandomItem(WorkoutsTitles),
    backgroundImage: `mocks/workout-${generateRandomValue(1, WORKOUT_IMAGES_COUNT)}.jpg`,
    level: getRandomItem(Object.values(UserLevel)),
    type: getRandomItem(Object.values(WorkoutType)),
    duration: getRandomItem(Object.values(WorkoutDuration)),
    price: generateRandomValue(0, MAX_PRICE),
    calories: generateRandomValue(CaloriesValue.Min, CaloriesValue.Max),
    description: getRandomItem(WorkoutsDescriptions),
    userSex: getRandomItem(Object.values(WorkoutSexFor)),
    isSpecial: Boolean(generateRandomValue(0, 1)),
  };
}

function generateWorkoutsForCoach(
  coachId: string,
  videosIds: string[],
): WorkoutEntity[] {
  return Array.from({ length: GeneratedDataAmount.Workouts }).map(() =>
    WorkoutEntity.fromObject(
      Object.assign(generateWorkout(), {
        coachId,
        video: getRandomItem(videosIds),
        rating: DEFAULT_RATING,
      }),
    ),
  );
}

export function generateWorkoutsEntities(
  coachesIds: string[],
  videosIds: string[],
): WorkoutEntity[] {
  return coachesIds
    .map((coach) => generateWorkoutsForCoach(coach, videosIds))
    .flat();
}
