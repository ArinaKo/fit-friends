import { generateDate, generateRandomValue, getRandomItem } from '@app/helpers';
import { RatingValue } from 'src/shared/const';
import { CommentsTexts } from './mock-data';

const COMMENTS_NUMBER = 5;

function generateComment(usersIds) {
  return {
    userId: getRandomItem(usersIds),
    rating: generateRandomValue(RatingValue.Min, RatingValue.Max),
    text: getRandomItem(CommentsTexts),
    createdAt: generateDate(),
  };
}

export function generatesComments(workoutId: string, usersIds: string[]) {
  return Array.from({ length: COMMENTS_NUMBER }).forEach(() =>
    Object.assign(generateComment(usersIds), { workoutId }),
  );
}
