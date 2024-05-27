import { REQUIRED_INPUT_MESSAGE, WorkoutSexFor } from '../../const';
import { WorkoutForm } from '../../types';
import {
  createWorkoutAction,
  updateWorkoutAction,
  updateWorkoutVideoAction,
} from '../api-actions';
import {
  resetWorkoutForm,
  setCalories,
  setCreationRequiredFields,
  setDuration,
  setIsSpecial,
  setPrice,
  setTitle,
  setType,
  setUpdateWorkoutRequiredFields,
  setUserSexFor,
  setVideoPresence,
  setWorkoutDescription,
  setWorkoutFormError,
  setWorkoutLevel,
  workoutForm,
} from './workout-form';

describe('WorkoutForm Slice', () => {
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

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = workoutForm.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = workoutForm.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should reset form data with "resetWorkoutForm" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        title: 'title',
        type: 'type',
        duration: '45',
        level: 'pro',
        calories: '350',
        price: '489',
      };

      const result = workoutForm.reducer(state, resetWorkoutForm());

      expect(result).toEqual(initialState);
    });

    it('should set title with "setTitle" action', () => {
      const expectedResult = 'title';

      const result = workoutForm.reducer(
        initialState,
        setTitle(expectedResult),
      );

      expect(result.title).toBe(expectedResult);
    });

    it('should set type with "setType" action', () => {
      const expectedResult = 'type';

      const result = workoutForm.reducer(initialState, setType(expectedResult));

      expect(result.type).toBe(expectedResult);
    });

    it('should set duration with "setDuration" action', () => {
      const expectedResult = 'duration';

      const result = workoutForm.reducer(
        initialState,
        setDuration(expectedResult),
      );

      expect(result.duration).toBe(expectedResult);
    });

    it('should set level with "setWorkoutLevel" action', () => {
      const expectedResult = 'level';

      const result = workoutForm.reducer(
        initialState,
        setWorkoutLevel(expectedResult),
      );

      expect(result.level).toBe(expectedResult);
    });

    it('should set location with "setCalories" action', () => {
      const expectedResult = '400';

      const result = workoutForm.reducer(
        initialState,
        setCalories(expectedResult),
      );

      expect(result.calories).toBe(expectedResult);
    });

    it('should set price with "setPrice" action', () => {
      const expectedResult = '400';

      const result = workoutForm.reducer(
        initialState,
        setPrice(expectedResult),
      );

      expect(result.price).toBe(expectedResult);
    });

    it('should set user sex with "setUserSexFor" action', () => {
      const expectedResult = 'user-sex';

      const result = workoutForm.reducer(
        initialState,
        setUserSexFor(expectedResult),
      );

      expect(result.userSex).toBe(expectedResult);
    });

    it('should set description with "setWorkoutDescription" action', () => {
      const expectedResult = 'description';

      const result = workoutForm.reducer(
        initialState,
        setWorkoutDescription(expectedResult),
      );

      expect(result.description).toBe(expectedResult);
    });

    it('should set hasVideo status with "setVideoPresence" action', () => {
      const expectedResult = true;

      const result = workoutForm.reducer(
        initialState,
        setVideoPresence(expectedResult),
      );

      expect(result.hasVideo).toBe(expectedResult);
    });

    it('should set isSpecial to "true" and decrease price by 10% with "setIsSpecial" action because state value is "false"', () => {
      const state: WorkoutForm = {
        ...initialState,
        price: '100',
        isSpecial: false,
      };
      const expectedResult: WorkoutForm = {
        ...initialState,
        price: '90',
        isSpecial: true,
      };

      const result = workoutForm.reducer(state, setIsSpecial());

      expect(result).toEqual(expectedResult);
    });

    it('should set isSpecial to "false" and increase price by 10% with "setIsSpecial" action because state value is "true"', () => {
      const state: WorkoutForm = {
        ...initialState,
        price: '90',
        isSpecial: true,
      };
      const expectedResult: WorkoutForm = {
        ...initialState,
        price: '100',
        isSpecial: false,
      };

      const result = workoutForm.reducer(state, setIsSpecial());

      expect(result).toEqual(expectedResult);
    });

    it('should set error with "setWorkoutFormError" action', () => {
      const actionPayload: [string, string | undefined] = [
        'description',
        'error',
      ];
      const expectedResult = {
        ...initialState.validationErrors,
        description: actionPayload[1],
      };

      const result = workoutForm.reducer(
        initialState,
        setWorkoutFormError(actionPayload),
      );

      expect(result.validationErrors).toEqual(expectedResult);
    });

    it('should set required fields with "setCreationRequiredFields" action', () => {
      const expectedResult: WorkoutForm = {
        ...initialState,
        validationErrors: {
          ...initialState.validationErrors,
          title: REQUIRED_INPUT_MESSAGE,
          type: REQUIRED_INPUT_MESSAGE,
          duration: REQUIRED_INPUT_MESSAGE,
          level: REQUIRED_INPUT_MESSAGE,
          calories: REQUIRED_INPUT_MESSAGE,
          price: REQUIRED_INPUT_MESSAGE,
          description: REQUIRED_INPUT_MESSAGE,
          video: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = workoutForm.reducer(
        initialState,
        setCreationRequiredFields(),
      );

      expect(result.validationErrors).toEqual(expectedResult.validationErrors);
    });

    it('should set required fields with "setUpdateWorkoutRequiredFields" action', () => {
      const expectedResult: WorkoutForm = {
        ...initialState,
        validationErrors: {
          ...initialState.validationErrors,
          title: REQUIRED_INPUT_MESSAGE,
          price: REQUIRED_INPUT_MESSAGE,
          description: REQUIRED_INPUT_MESSAGE,
          video: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = workoutForm.reducer(
        initialState,
        setUpdateWorkoutRequiredFields(),
      );

      expect(result.validationErrors).toEqual(expectedResult.validationErrors);
    });
  });

  describe('Api-actions check', () => {
    it('should set isSending to "true" with "createWorkoutAction.pending" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: false,
      };

      const result = workoutForm.reducer(state, createWorkoutAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "createWorkoutAction.rejected" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: true,
      };

      const result = workoutForm.reducer(state, createWorkoutAction.rejected);

      expect(result.isSending).toBe(false);
    });

    it('should reset form with "createWorkoutAction.fulfilled" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        title: 'title',
        type: 'type',
        duration: '45',
        level: 'pro',
        calories: '350',
        price: '489',
        isSending: true,
      };

      const result = workoutForm.reducer(state, createWorkoutAction.fulfilled);

      expect(result).toEqual(initialState);
    });

    it('should set isSending to "true" with "updateWorkoutAction.pending" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: false,
      };

      const result = workoutForm.reducer(state, updateWorkoutAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "updateWorkoutAction.rejected" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: true,
      };

      const result = workoutForm.reducer(state, updateWorkoutAction.rejected);

      expect(result.isSending).toBe(false);
    });

    it('should reset form with "updateWorkoutAction.fulfilled" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        title: 'title',
        type: 'type',
        duration: '45',
        level: 'pro',
        calories: '350',
        price: '489',
        isSending: true,
      };

      const result = workoutForm.reducer(state, updateWorkoutAction.fulfilled);

      expect(result).toEqual(initialState);
    });

    it('should set isSending to "true" with "updateWorkoutVideoAction.pending" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: false,
      };

      const result = workoutForm.reducer(
        state,
        updateWorkoutVideoAction.pending,
      );

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "updateWorkoutVideoAction.rejected" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: true,
      };

      const result = workoutForm.reducer(
        state,
        updateWorkoutVideoAction.rejected,
      );

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "false" with "updateWorkoutVideoAction.fulfilled" action', () => {
      const state: WorkoutForm = {
        ...initialState,
        isSending: true,
      };

      const result = workoutForm.reducer(
        state,
        updateWorkoutVideoAction.fulfilled,
      );

      expect(result.isSending).toBe(false);
    });
  });
});
