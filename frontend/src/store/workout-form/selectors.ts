import { NameSpace } from '../../const';
import { State } from '../../types';

export const getWorkoutFormTitle = (state: State): string =>
  state[NameSpace.WorkoutForm].title;

export const getWorkoutFormType = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].type;

export const getWorkoutFormDuration = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].duration;

export const getWorkoutFormLevel = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].level;

export const getWorkoutFormCalories = (state: State): string =>
  state[NameSpace.WorkoutForm].calories;

export const getWorkoutFormPrice = (state: State): string =>
  state[NameSpace.WorkoutForm].price;

export const getWorkoutFormUserSex = (state: State): string =>
  state[NameSpace.WorkoutForm].userSex;

export const getWorkoutFormDescription = (state: State): string =>
  state[NameSpace.WorkoutForm].description;

export const isWorkoutFormHasVideo = (state: State): boolean =>
  state[NameSpace.WorkoutForm].hasVideo;

export const getWorkoutFormSpecialFlag = (state: State): boolean =>
  state[NameSpace.WorkoutForm].isSpecial;

export const getWorkoutFormTitleError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.title;

export const getWorkoutFormTypeError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.type;

export const getWorkoutFormDurationError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.duration;

export const getWorkoutFormLevelError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.level;

export const getWorkoutFormCaloriesError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.calories;

export const getWorkoutFormPriceError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.price;

export const getWorkoutFormDescriptionError = (
  state: State,
): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.description;

export const getWorkoutFormVideoError = (state: State): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.video;

export const isWorkoutFormHaveErrors = (state: State): boolean =>
  Object.values(state[NameSpace.WorkoutForm].validationErrors).some(
    (error) => error !== undefined,
  );

export const isWorkoutFormDataSending = (state: State): boolean =>
  state[NameSpace.WorkoutForm].isSending;
