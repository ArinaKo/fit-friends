import { WorkoutsSortType } from '../../const';
import { WorkoutsList, WorkoutsWithPagination } from '../../types';
import { makeFakeWorkout } from '../../utils';
import { getAllWorkoutsAction, getCoachWorkoutsAction } from '../api-actions';
import {
  resetWorkoutsFilters,
  setWorkoutsCaloriesFilter,
  setWorkoutsDurationFilter,
  setWorkoutsPriceFilter,
  setWorkoutsRatingFilter,
  setWorkoutsSorting,
  setWorkoutsTypesFilter,
  workoutsList,
} from './workouts-list';

describe('WorkoutsList Slice', () => {
  const initialState: WorkoutsList = {
    workouts: [],
    price: {
      min: 0,
      max: 50000,
    },
    calories: {
      min: 1000,
      max: 5000,
    },
    rating: {
      min: 0,
      max: 5,
    },
    filter: {
      price: {
        min: undefined,
        max: undefined,
      },
      calories: {
        min: undefined,
        max: undefined,
      },
      rating: {
        min: 0,
        max: 5,
      },
      duration: [],
      types: [],
      sorting: undefined,
    },
    isDataLoading: false,
  };
  const payload: WorkoutsWithPagination = {
    workouts: [makeFakeWorkout()],
    totalPages: 1,
    totalItems: 1,
    currentPage: 1,
    itemsPerPage: 1,
    priceRange: [100, 10000],
    caloriesRange: [50, 500],
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = workoutsList.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = workoutsList.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should reset filter with "resetWorkoutsFilters" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          price: {
            min: 10,
            max: 100000,
          },
          calories: {
            min: 10,
            max: 1000,
          },
          rating: {
            min: 3,
            max: 4,
          },
          duration: ['15'],
          types: ['box'],
          sorting: 'up',
        },
      };

      const result = workoutsList.reducer(state, resetWorkoutsFilters());

      expect(result.filter).toEqual(initialState.filter);
    });

    it('should set price filter with "setWorkoutsPriceFilter" action', () => {
      const actionPayload: ['min' | 'max', number] = ['min', 30];
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          price: {
            min: undefined,
            max: undefined,
          },
        },
      };

      const result = workoutsList.reducer(
        state,
        setWorkoutsPriceFilter(actionPayload),
      );

      expect(result.filter.price.min).toBe(actionPayload[1]);
    });

    it('should set calories filter with "setWorkoutsCaloriesFilter" action', () => {
      const actionPayload: ['min' | 'max', number] = ['min', 30];
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          calories: {
            min: undefined,
            max: undefined,
          },
        },
      };

      const result = workoutsList.reducer(
        state,
        setWorkoutsCaloriesFilter(actionPayload),
      );

      expect(result.filter.calories.min).toBe(actionPayload[1]);
    });

    it('should set rating filter with "setWorkoutsRatingFilter" action', () => {
      const actionPayload: ['min' | 'max', number] = ['min', 3];
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          rating: {
            min: 0,
            max: 5,
          },
        },
      };

      const result = workoutsList.reducer(
        state,
        setWorkoutsRatingFilter(actionPayload),
      );

      expect(result.filter.rating.min).toBe(actionPayload[1]);
    });

    it('should add duration to filter with "setWorkoutsDurationFilter" action because filter doesn\'t include payload value', () => {
      const actionPayload = '15';
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          duration: [],
        },
      };
      const expectedResult = [actionPayload];

      const result = workoutsList.reducer(
        state,
        setWorkoutsDurationFilter(actionPayload),
      );

      expect(result.filter.duration).toEqual(expectedResult);
    });

    it('should remove duration from filter with "setWorkoutsDurationFilter" action because filter includes payload value', () => {
      const actionPayload = '15';
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          duration: [actionPayload],
        },
      };
      const expectedResult: string[] = [];

      const result = workoutsList.reducer(
        state,
        setWorkoutsDurationFilter(actionPayload),
      );

      expect(result.filter.duration).toEqual(expectedResult);
    });

    it('should add type to filter with "setWorkoutsTypesFilter" action because filter doesn\'t include payload value', () => {
      const actionPayload = 'box';
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          types: [],
        },
      };
      const expectedResult = [actionPayload];

      const result = workoutsList.reducer(
        state,
        setWorkoutsTypesFilter(actionPayload),
      );

      expect(result.filter.types).toEqual(expectedResult);
    });

    it('should remove type from filter with "setWorkoutsTypesFilter" action because filter includes payload value', () => {
      const actionPayload = 'box';
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          types: [actionPayload],
        },
      };
      const expectedResult: string[] = [];

      const result = workoutsList.reducer(
        state,
        setWorkoutsTypesFilter(actionPayload),
      );

      expect(result.filter.types).toEqual(expectedResult);
    });

    it('should set sorting with "setWorkoutsSorting" action', () => {
      const actionPayload = WorkoutsSortType.PriceDown;
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          sorting: undefined,
        },
      };

      const result = workoutsList.reducer(
        state,
        setWorkoutsSorting(actionPayload),
      );

      expect(result.filter.sorting).toBe(actionPayload);
    });

    it('should set sorting and update price filter with "setWorkoutsSorting" action and action payload value "free"', () => {
      const actionPayload = WorkoutsSortType.Free;
      const state: WorkoutsList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          price: {
            min: 45,
            max: 10000,
          },
          sorting: undefined,
        },
      };
      const expectedResult: WorkoutsList = {
        ...state,
        filter: {
          ...state.filter,
          price: {
            min: 0,
            max: 0,
          },
          sorting: actionPayload,
        },
      };

      const result = workoutsList.reducer(
        state,
        setWorkoutsSorting(actionPayload),
      );

      expect(result.filter).toEqual(expectedResult.filter);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" with "getCoachWorkoutsAction.pending" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        isDataLoading: false,
      };

      const result = workoutsList.reducer(
        state,
        getCoachWorkoutsAction.pending,
      );

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "false" with "getCoachWorkoutsAction.rejected" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = workoutsList.reducer(
        state,
        getCoachWorkoutsAction.rejected,
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should isDataLoading to "false" with "getCoachWorkoutsAction.fulfilled" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = workoutsList.reducer(
        state,
        getCoachWorkoutsAction.fulfilled(payload, '', undefined),
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set price range with "getCoachWorkoutsAction.fulfilled" action', () => {
      const expectedResult = {
        min: payload.priceRange[0],
        max: payload.priceRange[1],
      };

      const result = workoutsList.reducer(
        initialState,
        getCoachWorkoutsAction.fulfilled(payload, '', undefined),
      );

      expect(result.price).toEqual(expectedResult);
    });

    it('should set calories range with "getCoachWorkoutsAction.fulfilled" action', () => {
      const expectedResult = {
        min: payload.caloriesRange[0],
        max: payload.caloriesRange[1],
      };

      const result = workoutsList.reducer(
        initialState,
        getCoachWorkoutsAction.fulfilled(payload, '', undefined),
      );

      expect(result.calories).toEqual(expectedResult);
    });

    it('should set workouts list with "getCoachWorkoutsAction.fulfilled" action and because current page is 1', () => {
      const state: WorkoutsList = {
        ...initialState,
        workouts: [],
      };
      const actionPayload: WorkoutsWithPagination = {
        ...payload,
        currentPage: 1,
      };
      const expectedState: WorkoutsList = {
        ...initialState,
        workouts: actionPayload.workouts,
      };

      const result = workoutsList.reducer(
        state,
        getCoachWorkoutsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.workouts).toEqual(expectedState.workouts);
    });

    it('should add workouts to list with "getCoachWorkoutsAction.fulfilled" action and because current page more then 1', () => {
      const state: WorkoutsList = {
        ...initialState,
        workouts: [makeFakeWorkout()],
      };
      const actionPayload: WorkoutsWithPagination = {
        ...payload,
        currentPage: 2,
      };
      const expectedState: WorkoutsList = {
        ...initialState,
        workouts: [...state.workouts, ...actionPayload.workouts],
      };

      const result = workoutsList.reducer(
        state,
        getCoachWorkoutsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.workouts).toEqual(expectedState.workouts);
    });

    it('should set isDataLoading to "true" with "getAllWorkoutsAction.pending" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        isDataLoading: false,
      };

      const result = workoutsList.reducer(state, getAllWorkoutsAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "false" with "getAllWorkoutsAction.rejected" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = workoutsList.reducer(state, getAllWorkoutsAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should isDataLoading to "false" with "getAllWorkoutsAction.fulfilled" action', () => {
      const state: WorkoutsList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = workoutsList.reducer(
        state,
        getAllWorkoutsAction.fulfilled(payload, '', undefined),
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set price range with "getAllWorkoutsAction.fulfilled" action', () => {
      const expectedResult = {
        min: payload.priceRange[0],
        max: payload.priceRange[1],
      };

      const result = workoutsList.reducer(
        initialState,
        getAllWorkoutsAction.fulfilled(payload, '', undefined),
      );

      expect(result.price).toEqual(expectedResult);
    });

    it('should set calories range with "getAllWorkoutsAction.fulfilled" action', () => {
      const expectedResult = {
        min: payload.caloriesRange[0],
        max: payload.caloriesRange[1],
      };

      const result = workoutsList.reducer(
        initialState,
        getAllWorkoutsAction.fulfilled(payload, '', undefined),
      );

      expect(result.calories).toEqual(expectedResult);
    });

    it('should set workouts list with "getAllWorkoutsAction.fulfilled" action and because current page is 1', () => {
      const state: WorkoutsList = {
        ...initialState,
        workouts: [],
      };
      const actionPayload: WorkoutsWithPagination = {
        ...payload,
        currentPage: 1,
      };
      const expectedState: WorkoutsList = {
        ...initialState,
        workouts: actionPayload.workouts,
      };

      const result = workoutsList.reducer(
        state,
        getAllWorkoutsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.workouts).toEqual(expectedState.workouts);
    });

    it('should add workouts to list with "getAllWorkoutsAction.fulfilled" action and because current page more then 1', () => {
      const state: WorkoutsList = {
        ...initialState,
        workouts: [makeFakeWorkout()],
      };
      const actionPayload: WorkoutsWithPagination = {
        ...payload,
        currentPage: 2,
      };
      const expectedState: WorkoutsList = {
        ...initialState,
        workouts: [...state.workouts, ...actionPayload.workouts],
      };

      const result = workoutsList.reducer(
        state,
        getAllWorkoutsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.workouts).toEqual(expectedState.workouts);
    });
  });
});
