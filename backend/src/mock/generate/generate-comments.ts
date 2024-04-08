import { generateRandomValue, getRandomItem } from '@app/helpers';
import { RatingValue } from 'src/shared/const';
import { CommentsTexts } from './mock-data';
import { GeneratedDataAmount } from '../mock.const';
import { CommentEntity } from 'src/comment/comment.entity';

function generateComment(usersIds: string[]) {
  return {
    userId: getRandomItem(usersIds),
    rating: generateRandomValue(RatingValue.Min, RatingValue.Max),
    text: getRandomItem(CommentsTexts),
  };
}

function generateCommentsForWorkout(
  workoutId: string,
  usersIds: string[],
): CommentEntity[] {
  return Array.from({ length: GeneratedDataAmount.Comments }).map(() =>
    CommentEntity.fromObject(
      Object.assign(generateComment(usersIds), { workoutId }),
    ),
  );
}

export function generateCommentsEntities(
  workoutsIds: string[],
  usersIds: string[],
): CommentEntity[] {
  return workoutsIds
    .map((workoutId) => generateCommentsForWorkout(workoutId, usersIds))
    .flat();
}
