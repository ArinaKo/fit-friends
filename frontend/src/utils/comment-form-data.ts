import { State } from '../types';

export function getCommentData(state: State) {
  const { rating, text, workoutId } = state.COMMENT_FORM;
  return {
    rating: rating,
    text,
    workoutId,
  };
}
