import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkoutForm } from '../../types';
import {
  NameSpace,
  REQUIRED_INPUT_MESSAGE,
  SALE_PERCENT,
  WorkoutSexFor,
} from '../../const';
import {
  createWorkoutAction,
  updateWorkoutAction,
  updateWorkoutVideoAction,
} from '../api-actions';

const initialState: WorkoutForm = {
  title: '',
  type: undefined,
  duration: undefined,
  level: undefined,
  calories: '',
  price: '',
  userSex: WorkoutSexFor.Female,
  description: '',
  hasVideo: false,
  isSpecial: false,
  validationErrors: {
    title: undefined,
    type: undefined,
    duration: undefined,
    level: undefined,
    calories: undefined,
    price: undefined,
    description: undefined,
    video: undefined,
  },
  isSending: false,
};

export const workoutForm = createSlice({
  name: NameSpace.WorkoutForm,
  initialState,
  reducers: {
    resetWorkoutForm: () => ({ ...initialState }),
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },
    setWorkoutLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setCalories: (state, action: PayloadAction<string>) => {
      state.calories = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setUserSexFor: (state, action: PayloadAction<string>) => {
      state.userSex = action.payload;
    },
    setWorkoutDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setVideoPresence: (state, action: PayloadAction<boolean>) => {
      state.hasVideo = action.payload;
    },
    setIsSpecial: (state) => {
      state.isSpecial = !state.isSpecial;
      state.price = state.isSpecial
        ? String(Math.ceil((Number(state.price) / 100) * (100 - SALE_PERCENT)))
        : String(Math.floor((Number(state.price) / (100 - SALE_PERCENT)) * 100));
    },
    setWorkoutFormError: (
      state,
      action: PayloadAction<[string, string | undefined]>,
    ) => {
      state.validationErrors = {
        ...state.validationErrors,
        [action.payload[0]]: action.payload[1],
      };
    },
    setCreationRequiredFields: (state) => {
      if (!state.title) {
        state.validationErrors.title = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.type) {
        state.validationErrors.type = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.duration) {
        state.validationErrors.duration = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.level) {
        state.validationErrors.level = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.calories) {
        state.validationErrors.calories = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.price) {
        state.validationErrors.price = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.description) {
        state.validationErrors.description = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.hasVideo) {
        state.validationErrors.video = REQUIRED_INPUT_MESSAGE;
      }
    },
    setUpdateWorkoutRequiredFields: (state) => {
      if (!state.title) {
        state.validationErrors.title = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.price) {
        state.validationErrors.price = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.description) {
        state.validationErrors.description = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.hasVideo) {
        state.validationErrors.video = REQUIRED_INPUT_MESSAGE;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createWorkoutAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(createWorkoutAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(createWorkoutAction.fulfilled, () => ({ ...initialState }))
      .addCase(updateWorkoutAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(updateWorkoutAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(updateWorkoutAction.fulfilled, () => ({ ...initialState }))
      .addCase(updateWorkoutVideoAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(updateWorkoutVideoAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(updateWorkoutVideoAction.fulfilled, (state) => {
        state.isSending = false;
      });
  },
});

export const {
  resetWorkoutForm,
  setTitle,
  setType,
  setDuration,
  setWorkoutLevel,
  setCalories,
  setPrice,
  setUserSexFor,
  setWorkoutDescription,
  setVideoPresence,
  setIsSpecial,
  setWorkoutFormError,
  setCreationRequiredFields,
  setUpdateWorkoutRequiredFields,
} = workoutForm.actions;
