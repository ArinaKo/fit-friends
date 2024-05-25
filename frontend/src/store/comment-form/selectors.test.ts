import { NameSpace } from '../../const';
import { CommentForm } from '../../types';
import {
  getCommentRating,
  getCommentText,
  getCommentTextError,
  isCommentFormHasErrors,
  isCommentSending,
} from './selectors';

describe('CommentForm selectors', () => {
  const state: CommentForm = {
    workoutId: '',
    rating: 4,
    text: 'text',
    validationErrors: {
      text: undefined,
    },
    isSending: false,
  };

  it('should return rating value', () => {
    const { rating } = state;

    const result = getCommentRating({ [NameSpace.CommentForm]: state });

    expect(result).toBe(rating);
  });

  it('should return text value', () => {
    const { text } = state;

    const result = getCommentText({ [NameSpace.CommentForm]: state });

    expect(result).toBe(text);
  });

  it('should return form sending status', () => {
    const { isSending } = state;

    const result = isCommentSending({ [NameSpace.CommentForm]: state });

    expect(result).toBe(isSending);
  });

  it('should return text validation error', () => {
    const { text } = state.validationErrors;

    const result = getCommentTextError({ [NameSpace.CommentForm]: state });

    expect(result).toBe(text);
  });

  it('should return "true" because form has validation errors', () => {
    const error = { text: 'error' };
    const currentState = { ...state, validationErrors: error };

    const result = isCommentFormHasErrors({
      [NameSpace.CommentForm]: currentState,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because form doesn\'t have any validation errors', () => {
    const error = { text: undefined };
    const currentState = { ...state, validationErrors: error };

    const result = isCommentFormHasErrors({
      [NameSpace.CommentForm]: currentState,
    });

    expect(result).toBe(false);
  });
});
