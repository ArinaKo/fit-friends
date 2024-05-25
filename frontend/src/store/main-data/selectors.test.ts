import { NameSpace } from '../../const';
import { MainData } from '../../types';
import { makeFakeUser, makeFakeWorkout } from '../../utils';
import {
  getPopularWorkouts,
  getReadyUsers,
  getSpecialWorkouts,
  getWorkoutsForUser,
  isMainDataLoading,
} from './selectors';

describe('MainData selectors', () => {
  const state: MainData = {
    workoutsForUser: [makeFakeWorkout()],
    specialWorkouts: [makeFakeWorkout()],
    popularWorkouts: [makeFakeWorkout()],
    readyUsers: [makeFakeUser()],
    isDataLoading: false,
  };

  it('should return workouts for user list', () => {
    const { workoutsForUser } = state;

    const result = getWorkoutsForUser({ [NameSpace.MainData]: state });

    expect(result).toEqual(workoutsForUser);
  });

  it('should return special workouts list', () => {
    const { specialWorkouts } = state;

    const result = getSpecialWorkouts({ [NameSpace.MainData]: state });

    expect(result).toEqual(specialWorkouts);
  });

  it('should return popular workouts list', () => {
    const { popularWorkouts } = state;

    const result = getPopularWorkouts({ [NameSpace.MainData]: state });

    expect(result).toEqual(popularWorkouts);
  });

  it('should return ready users list', () => {
    const { readyUsers } = state;

    const result = getReadyUsers({ [NameSpace.MainData]: state });

    expect(result).toEqual(readyUsers);
  });

  it('should return form data loading status', () => {
    const { isDataLoading } = state;

    const result = isMainDataLoading({ [NameSpace.MainData]: state });

    expect(result).toBe(isDataLoading);
  });
});
