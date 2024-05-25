import { NameSpace } from '../../const';
import { State } from '../../types';

export const getCommentRating = (
  state: Pick<State, NameSpace.CommentForm>,
): number => state[NameSpace.CommentForm].rating;

export const getCommentText = (
  state: Pick<State, NameSpace.CommentForm>,
): string => state[NameSpace.CommentForm].text;

export const isCommentSending = (
  state: Pick<State, NameSpace.CommentForm>,
): boolean => state[NameSpace.CommentForm].isSending;

export const getCommentTextError = (
  state: Pick<State, NameSpace.CommentForm>,
): string | undefined => state[NameSpace.CommentForm].validationErrors.text;

export const isCommentFormHasErrors = (
  state: Pick<State, NameSpace.CommentForm>,
): boolean =>
  Object.values(state[NameSpace.CommentForm].validationErrors).some(
    (error) => error !== undefined,
  );
