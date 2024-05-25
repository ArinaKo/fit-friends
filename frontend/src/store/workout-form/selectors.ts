import { NameSpace } from '../../const';
import { State } from '../../types';

export const getWorkoutFormTitle = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string => state[NameSpace.WorkoutForm].title;

export const getWorkoutFormType = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].type;

export const getWorkoutFormDuration = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].duration;

export const getWorkoutFormLevel = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].level;

export const getWorkoutFormCalories = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string => state[NameSpace.WorkoutForm].calories;

export const getWorkoutFormPrice = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string => state[NameSpace.WorkoutForm].price;

export const getWorkoutFormUserSex = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string => state[NameSpace.WorkoutForm].userSex;

export const getWorkoutFormDescription = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string => state[NameSpace.WorkoutForm].description;

export const isWorkoutFormHasVideo = (
  state: Pick<State, NameSpace.WorkoutForm>,
): boolean => state[NameSpace.WorkoutForm].hasVideo;

export const getWorkoutFormSpecialFlag = (
  state: Pick<State, NameSpace.WorkoutForm>,
): boolean => state[NameSpace.WorkoutForm].isSpecial;

export const getWorkoutFormTitleError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.title;

export const getWorkoutFormTypeError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.type;

export const getWorkoutFormDurationError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.duration;

export const getWorkoutFormLevelError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.level;

export const getWorkoutFormCaloriesError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.calories;

export const getWorkoutFormPriceError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.price;

export const getWorkoutFormDescriptionError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined =>
  state[NameSpace.WorkoutForm].validationErrors.description;

export const getWorkoutFormVideoError = (
  state: Pick<State, NameSpace.WorkoutForm>,
): string | undefined => state[NameSpace.WorkoutForm].validationErrors.video;

export const isWorkoutFormHaveErrors = (
  state: Pick<State, NameSpace.WorkoutForm>,
): boolean =>
  Object.values(state[NameSpace.WorkoutForm].validationErrors).some(
    (error) => error !== undefined,
  );

export const isWorkoutFormDataSending = (
  state: Pick<State, NameSpace.WorkoutForm>,
): boolean => state[NameSpace.WorkoutForm].isSending;
