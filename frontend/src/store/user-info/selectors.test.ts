import { NameSpace, UserRole } from '../../const';
import { UserInfo } from '../../types';
import { makeFakeFileData, makeFakeUser, makeFakeWorkout } from '../../utils';
import {
  getSubscriptionStatus,
  getUserCertificates,
  getUserDescription,
  getUserId,
  getUserImages,
  getUserReadyStatus,
  getUserLevel,
  getUserLocation,
  getUserName,
  getUserWorkoutTypes,
  getUserWorkouts,
  isUserAFriend,
  isUserRoleCoach,
  isUserLoading,
  isUserInfoHasError,
  isCoachInfoReady,
  isCoachWorkoutsLoading,
} from './selectors';

describe('UserInfo selectors', () => {
  const user = makeFakeUser();
  const state: UserInfo = {
    ...user,
    description: 'description',
    certificates: [makeFakeFileData()],
    isFriend: false,
    images: [makeFakeFileData()],
    workouts: [makeFakeWorkout()],
    subscriptionStatus: true,
    isDataLoading: false,
    isCoachInfoActual: true,
    isWorkoutsLoading: false,
    hasError: true,
  };

  it('should return id value', () => {
    const { id } = state;

    const result = getUserId({ [NameSpace.UserInfo]: state });

    expect(result).toBe(id);
  });

  it('should return name value', () => {
    const { name } = state;

    const result = getUserName({ [NameSpace.UserInfo]: state });

    expect(result).toBe(name);
  });

  it('should return ready status', () => {
    const { isReady } = state;

    const result = getUserReadyStatus({ [NameSpace.UserInfo]: state });

    expect(result).toBe(isReady);
  });

  it('should return "true" because user role is coach', () => {
    const role = UserRole.Coach;
    const currentState = { ...state, role };

    const result = isUserRoleCoach({ [NameSpace.UserInfo]: currentState });

    expect(result).toBe(true);
  });

  it('should return "false" because user role is not coach', () => {
    const role = UserRole.Default;
    const currentState = { ...state, role };

    const result = isUserRoleCoach({ [NameSpace.UserInfo]: currentState });

    expect(result).toBe(false);
  });

  it('should return location value', () => {
    const { location } = state;

    const result = getUserLocation({ [NameSpace.UserInfo]: state });

    expect(result).toBe(location);
  });

  it('should return images value', () => {
    const { images } = state;

    const result = getUserImages({ [NameSpace.UserInfo]: state });

    expect(result).toEqual(images);
  });

  it('should return workout types value', () => {
    const { workoutTypes } = state;

    const result = getUserWorkoutTypes({ [NameSpace.UserInfo]: state });

    expect(result).toEqual(workoutTypes);
  });

  it('should return level value', () => {
    const { level } = state;

    const result = getUserLevel({ [NameSpace.UserInfo]: state });

    expect(result).toBe(level);
  });

  it('should return description value', () => {
    const { description } = state;

    const result = getUserDescription({ [NameSpace.UserInfo]: state });

    expect(result).toBe(description);
  });

  it('should return isFriend status', () => {
    const { isFriend } = state;

    const result = isUserAFriend({ [NameSpace.UserInfo]: state });

    expect(result).toBe(isFriend);
  });

  it('should return subscription status', () => {
    const { subscriptionStatus } = state;

    const result = getSubscriptionStatus({ [NameSpace.UserInfo]: state });

    expect(result).toBe(subscriptionStatus);
  });

  it('should return certificates value', () => {
    const { certificates } = state;

    const result = getUserCertificates({ [NameSpace.UserInfo]: state });

    expect(result).toEqual(certificates);
  });

  it('should return user workouts value', () => {
    const { workouts } = state;

    const result = getUserWorkouts({ [NameSpace.UserInfo]: state });

    expect(result).toEqual(workouts);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isUserLoading({ [NameSpace.UserInfo]: state });

    expect(result).toBe(isDataLoading);
  });

  it('should return error flag value', () => {
    const { hasError } = state;

    const result = isUserInfoHasError({ [NameSpace.UserInfo]: state });

    expect(result).toBe(hasError);
  });

  it('should return coach info actual flag value', () => {
    const { isCoachInfoActual } = state;

    const result = isCoachInfoReady({ [NameSpace.UserInfo]: state });

    expect(result).toBe(isCoachInfoActual);
  });

  it('should return workouts data loading status', () => {
    const { isWorkoutsLoading } = state;

    const result = isCoachWorkoutsLoading({ [NameSpace.UserInfo]: state });

    expect(result).toBe(isWorkoutsLoading);
  });
});
