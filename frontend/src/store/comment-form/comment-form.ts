import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentForm } from '../../types';
import { NameSpace, REQUIRED_INPUT_MESSAGE, RatingValue } from '../../const';
import { sendCommentAction } from '../api-actions';

const initialState: CommentForm = {
  workoutId: '',
  rating: RatingValue.Max,
  text: '',
  validationErrors: {
    text: undefined,
  },
  isSending: false,
};

export const commentForm = createSlice({
  name: NameSpace.CommentForm,
  initialState,
  reducers: {
    setCommentForm: (_, action: PayloadAction<string>) => ({
      ...initialState,
      workoutId: action.payload,
    }),
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setCommentText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setCommentFormError: (
      state,
      action: PayloadAction<[string, string | undefined]>,
    ) => {
      state.validationErrors = {
        ...state.validationErrors,
        [action.payload[0]]: action.payload[1],
      };
    },
    setCommentRequiredFields: (state) => {
      if (!state.text) {
        state.validationErrors.text = REQUIRED_INPUT_MESSAGE;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendCommentAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendCommentAction.fulfilled, () => ({ ...initialState }))
      .addCase(sendCommentAction.rejected, (state) => {
        state.isSending = false;
      });
  },
});

export const {
  setCommentForm,
  setRating,
  setCommentText,
  setCommentFormError,
  setCommentRequiredFields,
} = commentForm.actions;
