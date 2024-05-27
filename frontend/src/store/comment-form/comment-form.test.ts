import { REQUIRED_INPUT_MESSAGE } from '../../const';
import { CommentForm } from '../../types';
import { sendCommentAction } from '../api-actions';
import {
  commentForm,
  setCommentForm,
  setCommentFormError,
  setCommentRequiredFields,
  setCommentText,
  setRating,
} from './comment-form';

describe('CommentForm Slice', () => {
  const initialState: CommentForm = {
    workoutId: '',
    rating: 5,
    text: '',
    validationErrors: {
      text: undefined,
    },
    isSending: false,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = commentForm.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = commentForm.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set workoutId and reset other data with "setCommentForm" action', () => {
      const actionPayload = 'workout-id';
      const state: CommentForm = {
        ...initialState,
        workoutId: '',
        rating: 3,
        text: 'text',
      };
      const expectedResult: CommentForm = {
        ...initialState,
        workoutId: actionPayload,
      };

      const result = commentForm.reducer(state, setCommentForm(actionPayload));

      expect(result).toEqual(expectedResult);
    });

    it('should set rating with "setRating" action', () => {
      const expectedResult = 4;

      const result = commentForm.reducer(
        initialState,
        setRating(expectedResult),
      );

      expect(result.rating).toBe(expectedResult);
    });

    it('should set text with "setCommentText" action', () => {
      const expectedResult = 'comment';

      const result = commentForm.reducer(
        initialState,
        setCommentText(expectedResult),
      );

      expect(result.text).toBe(expectedResult);
    });

    it('should set error with "setCommentFormError" action', () => {
      const actionPayload: [string, string | undefined] = ['text', 'error'];
      const expectedResult: CommentForm = {
        ...initialState,
        validationErrors: {
          text: actionPayload[1],
        },
      };

      const result = commentForm.reducer(
        initialState,
        setCommentFormError(actionPayload),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should set required fields with "setCommentRequiredFields" action', () => {
      const expectedResult: CommentForm = {
        ...initialState,
        validationErrors: {
          text: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = commentForm.reducer(
        initialState,
        setCommentRequiredFields(),
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Api-actions check', () => {
    it('should set isSending to "true" with "sendCommentAction.pending" action', () => {
      const state: CommentForm = {
        ...initialState,
        isSending: false,
      };

      const result = commentForm.reducer(state, sendCommentAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should reset data to initial sate with "sendCommentAction.fulfilled" action', () => {
      const state: CommentForm = {
        ...initialState,
        workoutId: 'id',
        rating: 3,
        text: 'text',
        isSending: true,
      };

      const result = commentForm.reducer(state, sendCommentAction.fulfilled);

      expect(result).toEqual(initialState);
    });

    it('should set isSending to "false" with "sendCommentAction.rejected" action', () => {
      const state: CommentForm = {
        ...initialState,
        isSending: true,
      };

      const result = commentForm.reducer(state, sendCommentAction.rejected);

      expect(result.isSending).toBe(false);
    });
  });
});
