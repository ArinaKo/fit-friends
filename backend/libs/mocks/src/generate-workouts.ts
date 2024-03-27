import { UserLevel, UserSex, WorkoutType, WorkoutDuration } from '@app/types';
import {
  generateRandomValue,
  getRandomItem,
} from '@app/helpers';
import { CaloriesValue } from 'src/const';
import { WorkoutsDescriptions, WorkoutsTitles } from './mock-data';

const IMAGES_NUMBER = 5;
const WORKOUTS_NUMBER = 5;
const MAX_PRICE = 50000;

function generateWorkout() {
  return {
    title: getRandomItem(WorkoutsTitles),
    backgroundImage: `training-${generateRandomValue(1, IMAGES_NUMBER)}.png`,
    level: getRandomItem(Object.values(UserLevel)),
    type: getRandomItem(Object.values(WorkoutType)),
    duration: getRandomItem(Object.values(WorkoutDuration)),
    price: generateRandomValue(0, MAX_PRICE),
    calories: generateRandomValue(CaloriesValue.Min, CaloriesValue.Max),
    description: getRandomItem(WorkoutsDescriptions),
    userSex: getRandomItem(Object.values(UserSex)),
    video: 'video.mov',
    isSpecial: Boolean(generateRandomValue(0, 1)),
  };
}

export function generatesWorkout(coachId: string) {
  return Array.from({ length: WORKOUTS_NUMBER }).forEach(() =>
    Object.assign(generateWorkout(), { coachId })
  );
}
