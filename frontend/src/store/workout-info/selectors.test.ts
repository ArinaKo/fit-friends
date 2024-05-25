import { AuthorizationStatus, NameSpace, UserRole } from '../../const';
import { AppData, WorkoutInfo } from '../../types';
import {
  makeFakeComment,
  makeFakeFileData,
  makeFakeUser,
  makeFakeWorkout,
} from '../../utils';
import {
  getWorkoutCalories,
  getWorkoutCoach,
  getWorkoutComments,
  getWorkoutDescription,
  getWorkoutDuration,
  getWorkoutId,
  getWorkoutImage,
  getWorkoutPrice,
  getWorkoutRating,
  getWorkoutSpecialFlag,
  getWorkoutTitle,
  getWorkoutType,
  getWorkoutUserSex,
  getWorkoutVideo,
  isCurrentWorkoutActive,
  isUserHaveAccessToWorkout,
  isWorkoutBalanceActive,
  isWorkoutBalanceExists,
  isWorkoutInfoEditing,
  isWorkoutInfoHasError,
  isWorkoutInfoLoading,
} from './selectors';

describe('WorkoutInfo selectors', () => {
  const workout = makeFakeWorkout();
  const state: WorkoutInfo = {
    ...workout,
    price: String(workout.price),
    video: makeFakeFileData(),
    coach: makeFakeUser(),
    balance: 3,
    comments: [makeFakeComment()],
    isDataLoading: false,
    isDataEditing: true,
    hasError: false,
  };

  it('should return workout id value', () => {
    const { id } = state;

    const result = getWorkoutId({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(id);
  });

  it('should return title value', () => {
    const { title } = state;

    const result = getWorkoutTitle({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(title);
  });

  it('should return type value', () => {
    const { type } = state;

    const result = getWorkoutType({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(type);
  });

  it('should return duration value', () => {
    const { duration } = state;

    const result = getWorkoutDuration({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(duration);
  });

  it('should return calories value', () => {
    const { calories } = state;

    const result = getWorkoutCalories({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(calories);
  });

  it('should return price value', () => {
    const { price } = state;

    const result = getWorkoutPrice({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(price);
  });

  it('should return rating value', () => {
    const { rating } = state;

    const result = getWorkoutRating({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(rating);
  });

  it('should return user sex value', () => {
    const { userSex } = state;

    const result = getWorkoutUserSex({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(userSex);
  });

  it('should return description value', () => {
    const { description } = state;

    const result = getWorkoutDescription({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(description);
  });

  it('should return video value', () => {
    const { video } = state;

    const result = getWorkoutVideo({ [NameSpace.WorkoutInfo]: state });

    expect(result).toEqual(video);
  });

  it('should return image value', () => {
    const { backgroundImage } = state;

    const result = getWorkoutImage({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(backgroundImage);
  });

  it('should return coach value', () => {
    const { coach } = state;

    const result = getWorkoutCoach({ [NameSpace.WorkoutInfo]: state });

    expect(result).toEqual(coach);
  });

  it('should return special flag value', () => {
    const { isSpecial } = state;

    const result = getWorkoutSpecialFlag({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(isSpecial);
  });

  it('should return comments list', () => {
    const { comments } = state;

    const result = getWorkoutComments({ [NameSpace.WorkoutInfo]: state });

    expect(result).toEqual(comments);
  });

  it('should return "true" because workout balance exists', () => {
    const balance = 4;
    const currentState = { ...state, balance };

    const result = isWorkoutBalanceExists({
      [NameSpace.WorkoutInfo]: currentState,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because workout balance doesn\'t exists', () => {
    const balance = null;
    const currentState = { ...state, balance };

    const result = isWorkoutBalanceExists({
      [NameSpace.WorkoutInfo]: currentState,
    });

    expect(result).toBe(false);
  });

  it('should return "true" because workout balance active', () => {
    const balance = 4;
    const currentState = { ...state, balance };

    const result = isWorkoutBalanceActive({
      [NameSpace.WorkoutInfo]: currentState,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because workout balance is not active', () => {
    const balance = 0;
    const currentState = { ...state, balance };

    const result = isWorkoutBalanceActive({
      [NameSpace.WorkoutInfo]: currentState,
    });

    expect(result).toBe(false);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isWorkoutInfoLoading({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(isDataLoading);
  });

  it('should return data editing status', () => {
    const { isDataEditing } = state;

    const result = isWorkoutInfoEditing({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(isDataEditing);
  });

  it('should return error flag value', () => {
    const { hasError } = state;

    const result = isWorkoutInfoHasError({ [NameSpace.WorkoutInfo]: state });

    expect(result).toBe(hasError);
  });

  it('should return "true" because user has access to workout', () => {
    const appDataSlice: AppData = {
      authStatus: AuthorizationStatus.Auth,
      userRole: UserRole.Default,
      userId: '',
      notifications: [],
      activeWorkout: undefined,
      activePage: undefined,
      activePopup: undefined,
    };

    const result = isUserHaveAccessToWorkout({
      [NameSpace.WorkoutInfo]: state,
      [NameSpace.AppData]: appDataSlice,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because user does\'t have access to workout', () => {
    const appDataSlice: AppData = {
      authStatus: AuthorizationStatus.Auth,
      userRole: UserRole.Coach,
      userId: 'not owner',
      notifications: [],
      activeWorkout: undefined,
      activePage: undefined,
      activePopup: undefined,
    };

    const result = isUserHaveAccessToWorkout({
      [NameSpace.WorkoutInfo]: state,
      [NameSpace.AppData]: appDataSlice,
    });

    expect(result).toBe(false);
  });

  it('should return "true" because workout is active workout', () => {
    const appDataSlice: AppData = {
      authStatus: AuthorizationStatus.Auth,
      userRole: undefined,
      userId: '',
      notifications: [],
      activeWorkout: state.id,
      activePage: undefined,
      activePopup: undefined,
    };

    const result = isCurrentWorkoutActive({
      [NameSpace.WorkoutInfo]: state,
      [NameSpace.AppData]: appDataSlice,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because current workout is not active workout', () => {
    const appDataSlice: AppData = {
      authStatus: AuthorizationStatus.Auth,
      userRole: undefined,
      userId: '',
      notifications: [],
      activeWorkout: undefined,
      activePage: undefined,
      activePopup: undefined,
    };

    const result = isCurrentWorkoutActive({
      [NameSpace.WorkoutInfo]: state,
      [NameSpace.AppData]: appDataSlice,
    });

    expect(result).toBe(false);
  });
});
