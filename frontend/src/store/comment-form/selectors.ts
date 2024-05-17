import { NameSpace } from '../../const';
import { State } from '../../types';

export const getCommentRating = (state: State): number =>
  state[NameSpace.CommentForm].rating;

export const getCommentText = (state: State): string =>
  state[NameSpace.CommentForm].text;

export const isCommentSending = (state: State): boolean =>
  state[NameSpace.CommentForm].isSending;

export const getCommentTextError = (state: State): string | undefined =>
  state[NameSpace.CommentForm].validationErrors.text;

export const isCommentFormHasErrors = (state: State): boolean =>
  Object.values(state[NameSpace.CommentForm].validationErrors).some(
    (error) => error !== undefined,
  );
