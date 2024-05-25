import { NameSpace } from '../../const';
import { WorkoutForm } from '../../types';
import { makeFakeWorkout } from '../../utils';
import {
  getWorkoutFormCalories,
  getWorkoutFormCaloriesError,
  getWorkoutFormDescription,
  getWorkoutFormDescriptionError,
  getWorkoutFormDuration,
  getWorkoutFormDurationError,
  getWorkoutFormLevel,
  getWorkoutFormLevelError,
  getWorkoutFormPrice,
  getWorkoutFormPriceError,
  getWorkoutFormSpecialFlag,
  getWorkoutFormTitle,
  getWorkoutFormTitleError,
  getWorkoutFormType,
  getWorkoutFormTypeError,
  getWorkoutFormUserSex,
  getWorkoutFormVideoError,
  isWorkoutFormDataSending,
  isWorkoutFormHasVideo,
  isWorkoutFormHaveErrors,
} from './selectors';

describe('WorkoutForm selectors', () => {
  const workout = makeFakeWorkout();
  const state: WorkoutForm = {
    ...workout,
    price: String(workout.price),
    calories: String(workout.calories),
    hasVideo: true,
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

  it('should return title value', () => {
    const { title } = state;

    const result = getWorkoutFormTitle({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(title);
  });

  it('should return type value', () => {
    const { type } = state;

    const result = getWorkoutFormType({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(type);
  });

  it('should return duration value', () => {
    const { duration } = state;

    const result = getWorkoutFormDuration({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(duration);
  });

  it('should return level value', () => {
    const { level } = state;

    const result = getWorkoutFormLevel({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(level);
  });

  it('should return calories value', () => {
    const { calories } = state;

    const result = getWorkoutFormCalories({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(calories);
  });

  it('should return price value', () => {
    const { price } = state;

    const result = getWorkoutFormPrice({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(price);
  });

  it('should return user sex value', () => {
    const { userSex } = state;

    const result = getWorkoutFormUserSex({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(userSex);
  });

  it('should return description value', () => {
    const { description } = state;

    const result = getWorkoutFormDescription({
      [NameSpace.WorkoutForm]: state,
    });

    expect(result).toBe(description);
  });

  it('should return "hasVideo" flag value', () => {
    const { hasVideo } = state;

    const result = isWorkoutFormHasVideo({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(hasVideo);
  });

  it('should return special flag value', () => {
    const { isSpecial } = state;

    const result = getWorkoutFormSpecialFlag({
      [NameSpace.WorkoutForm]: state,
    });

    expect(result).toBe(isSpecial);
  });

  describe('Validation errors selectors', () => {
    it('should return title validation error', () => {
      const { title } = state.validationErrors;

      const result = getWorkoutFormTitleError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(title);
    });

    it('should return type validation error', () => {
      const { type } = state.validationErrors;

      const result = getWorkoutFormTypeError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(type);
    });

    it('should return duration validation error', () => {
      const { duration } = state.validationErrors;

      const result = getWorkoutFormDurationError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(duration);
    });

    it('should return level validation error', () => {
      const { level } = state.validationErrors;

      const result = getWorkoutFormLevelError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(level);
    });

    it('should return calories validation error', () => {
      const { calories } = state.validationErrors;

      const result = getWorkoutFormCaloriesError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(calories);
    });

    it('should return price validation error', () => {
      const { price } = state.validationErrors;

      const result = getWorkoutFormPriceError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(price);
    });

    it('should return description validation error', () => {
      const { description } = state.validationErrors;

      const result = getWorkoutFormDescriptionError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(description);
    });

    it('should return video validation error', () => {
      const { video } = state.validationErrors;

      const result = getWorkoutFormVideoError({
        [NameSpace.WorkoutForm]: state,
      });

      expect(result).toBe(video);
    });
  });

  it('should return "true" because form has validation errors', () => {
    const validationErrors = { ...state.validationErrors, title: 'error' };
    const currentState = { ...state, validationErrors };

    const result = isWorkoutFormHaveErrors({
      [NameSpace.WorkoutForm]: currentState,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because form doesn\'t have any validation errors', () => {
    const validationErrors = {
      title: undefined,
      type: undefined,
      duration: undefined,
      level: undefined,
      calories: undefined,
      price: undefined,
      description: undefined,
      video: undefined,
    };
    const currentState = { ...state, validationErrors };

    const result = isWorkoutFormHaveErrors({
      [NameSpace.WorkoutForm]: currentState,
    });

    expect(result).toBe(false);
  });

  it('should return data sending status', () => {
    const { isSending } = state;

    const result = isWorkoutFormDataSending({ [NameSpace.WorkoutForm]: state });

    expect(result).toBe(isSending);
  });
});
