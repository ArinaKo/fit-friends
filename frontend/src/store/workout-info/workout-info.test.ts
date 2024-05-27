import { FullWorkout, WorkoutInfo } from '../../types';
import {
  makeFakeComment,
  makeFakeFileData,
  makeFakeUser,
  makeFakeWorkout,
} from '../../utils';
import {
  createOrderAction,
  decreaseWorkoutBalanceAction,
  getWorkoutAction,
  sendCommentAction,
  updateWorkoutAction,
  updateWorkoutVideoAction,
} from '../api-actions';
import { setWorkoutEditingStatus, workoutInfo } from './workout-info';

describe('WorkoutInfo Slice', () => {
  const initialState: WorkoutInfo = {
    id: '',
    coachId: '',
    title: '',
    price: '',
    description: '',
    isSpecial: false,
    video: undefined,
    backgroundImage: '',
    rating: 0,
    type: '',
    calories: 0,
    userSex: '',
    duration: '',
    coach: undefined,
    balance: null,
    comments: [],
    isDataLoading: false,
    isDataEditing: false,
    hasError: false,
  };
  const fullWorkoutData: FullWorkout = {
    ...makeFakeWorkout(),
    coach: makeFakeUser(),
    video: makeFakeFileData(),
    balance: null,
    comments: [makeFakeComment()],
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = workoutInfo.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = workoutInfo.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set editing status with "setWorkoutEditingStatus" action and ', () => {
      const actionPayload = true;
      const state: WorkoutInfo = {
        ...initialState,
        isDataEditing: false,
      };

      const result = workoutInfo.reducer(
        state,
        setWorkoutEditingStatus(actionPayload),
      );

      expect(result.isDataEditing).toBe(actionPayload);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" and hasError to "false" with "getWorkoutAction.pending" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        isDataLoading: false,
        hasError: true,
      };
      const expectedResult: WorkoutInfo = {
        ...initialState,
        isDataLoading: true,
        hasError: false,
      };

      const result = workoutInfo.reducer(state, getWorkoutAction.pending);

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataLoading to "false" and hasError to "true" with "getWorkoutAction.rejected" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        isDataLoading: true,
        hasError: false,
      };
      const expectedResult: WorkoutInfo = {
        ...initialState,
        isDataLoading: false,
        hasError: true,
      };

      const result = workoutInfo.reducer(state, getWorkoutAction.rejected);

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataLoading and hasError to "false" and set workout data with "getWorkoutAction.fulfilled" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        isDataLoading: true,
        hasError: true,
      };
      const expectedResult: WorkoutInfo = {
        ...initialState,
        id: fullWorkoutData.id,
        coachId: fullWorkoutData.coachId,
        title: fullWorkoutData.title,
        price: String(fullWorkoutData.price),
        description: fullWorkoutData.description,
        isSpecial: fullWorkoutData.isSpecial,
        video: fullWorkoutData.video,
        backgroundImage: fullWorkoutData.backgroundImage,
        rating: fullWorkoutData.rating,
        type: fullWorkoutData.type,
        calories: fullWorkoutData.calories,
        userSex: fullWorkoutData.userSex,
        duration: fullWorkoutData.duration,
        coach: fullWorkoutData.coach,
        balance: fullWorkoutData.balance,
        comments: fullWorkoutData.comments,
        isDataLoading: false,
        hasError: false,
      };

      const result = workoutInfo.reducer(
        state,
        getWorkoutAction.fulfilled(fullWorkoutData, '', ''),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should decrease balance with "decreaseWorkoutBalanceAction.fulfilled" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        balance: 3,
      };
      const actionPayload = {
        count: 2,
        workoutId: 'id',
      };

      const result = workoutInfo.reducer(
        state,
        decreaseWorkoutBalanceAction.fulfilled(actionPayload, '', ''),
      );

      expect(result.balance).toBe(actionPayload.count);
    });

    it('should set isDataEditing to "false" and update data with "updateWorkoutAction.fulfilled" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        ...fullWorkoutData,
        price: String(fullWorkoutData.price),
        isDataEditing: true,
      };
      const actionPayload = {
        ...fullWorkoutData,
        title: 'newTitle',
        description: 'newDescription',
        price: 500,
      };
      const expectedResult: WorkoutInfo = {
        ...state,
        title: actionPayload.title,
        price: String(actionPayload.price),
        description: actionPayload.description,
        isDataEditing: false,
      };

      const result = workoutInfo.reducer(
        state,
        updateWorkoutAction.fulfilled(actionPayload, '', ''),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should update video with "updateWorkoutVideoAction.fulfilled" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        video: makeFakeFileData(),
      };
      const actionPayload = makeFakeFileData();

      const result = workoutInfo.reducer(
        state,
        updateWorkoutVideoAction.fulfilled(actionPayload, '', {
          workoutId: '',
          video: new File([], ''),
        }),
      );

      expect(result.video).toEqual(actionPayload);
    });

    it('should add comment and update rating with "sendCommentAction.fulfilled" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        comments: [makeFakeComment()],
        rating: 4,
      };
      const actionPayload = { comment: makeFakeComment(), rating: 5 };
      const expectedResult: WorkoutInfo = {
        ...initialState,
        comments: [actionPayload.comment, ...state.comments],
        rating: actionPayload.rating,
      };

      const result = workoutInfo.reducer(
        state,
        sendCommentAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should update balance with "createOrderAction.fulfilled" action', () => {
      const state: WorkoutInfo = {
        ...initialState,
        balance: 0,
      };
      const actionPayload = { newBalance: 5 };

      const result = workoutInfo.reducer(
        state,
        createOrderAction.fulfilled({ newBalance: 5 }, '', undefined),
      );

      expect(result.balance).toEqual(actionPayload.newBalance);
    });
  });
});
