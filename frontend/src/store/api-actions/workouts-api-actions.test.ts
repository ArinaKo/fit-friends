import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {
  CommentsWithPagination,
  FullWorkout,
  State,
  WorkoutBalanceStatus,
  WorkoutsWithPagination,
} from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeComment,
  makeFakeFileData,
  makeFakeState,
  makeFakeUser,
  makeFakeWorkout,
} from '../../utils';
import { APIRoute } from '../../const';
import {
  createWorkoutAction,
  getAllWorkoutsAction,
  getCoachWorkoutsAction,
  getWorkoutAction,
  updateWorkoutAction,
  updateWorkoutVideoAction,
} from './workouts-api-actions';
import { redirectToRoute } from '../actions';
import * as workoutDataFunctions from '../../utils/workout-form-data';
import * as queryDataFunctions from '../../utils/query';

describe('Workouts async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const fullWorkoutData: FullWorkout = {
    ...makeFakeWorkout(),
    coach: makeFakeUser(),
    video: makeFakeFileData(),
    balance: null,
    comments: [],
  };
  const workoutsWithPagination: WorkoutsWithPagination = {
    workouts: [makeFakeWorkout()],
    totalPages: 1,
    totalItems: 1,
    currentPage: 1,
    itemsPerPage: 1,
    priceRange: [0, 0],
    caloriesRange: [0, 0],
  };
  const fakeFile = new File([], '');

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('createWorkoutAction', () => {
    it('should dispatch "createWorkoutAction.pending", "redirectToRoute" and "createWorkoutAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPost(APIRoute.Workouts).reply(201);

      await store.dispatch(createWorkoutAction(fakeFile));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        createWorkoutAction.pending.type,
        redirectToRoute.type,
        createWorkoutAction.fulfilled.type,
      ]);
    });

    it('should dispatch "createWorkoutAction.pending" and "createWorkoutAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Workouts).reply(400);

      await store.dispatch(createWorkoutAction(fakeFile));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        createWorkoutAction.pending.type,
        createWorkoutAction.rejected.type,
      ]);
    });

    it('should call "getCreateWorkoutData" once with state and file', async () => {
      mockAxiosAdapter.onPost(APIRoute.Workouts).reply(201);
      const mockGetCreateWorkoutData = vi.spyOn(
        workoutDataFunctions,
        'getCreateWorkoutData',
      );

      await store.dispatch(createWorkoutAction(fakeFile));

      expect(mockGetCreateWorkoutData).toBeCalledTimes(1);
      expect(mockGetCreateWorkoutData).toBeCalledWith(
        store.getState(),
        fakeFile,
      );
    });
  });

  describe('getWorkoutAction', () => {
    const workoutId = 'id';
    const balance: WorkoutBalanceStatus = {
      count: 3,
    };
    const commentsWithPagination: CommentsWithPagination = {
      comments: [makeFakeComment()],
      totalPages: 1,
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 1,
    };

    it('should dispatch "getWorkoutAction.pending" and "getWorkoutAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Workouts}/${workoutId}`)
        .reply(200, fullWorkoutData);
      mockAxiosAdapter
        .onGet(`${APIRoute.Balances}/${workoutId}`)
        .reply(200, balance);
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${workoutId}`)
        .reply(200, commentsWithPagination);
      const expectedPayload: FullWorkout = {
        ...fullWorkoutData,
        balance: balance.count,
        comments: commentsWithPagination.comments,
      };

      await store.dispatch(getWorkoutAction(workoutId));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getWorkoutActionFulfilled = actions.at(1) as ReturnType<
        typeof getWorkoutAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getWorkoutAction.pending.type,
        getWorkoutAction.fulfilled.type,
      ]);

      expect(getWorkoutActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "getWorkoutAction.pending" and "getWorkoutAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Workouts}/${workoutId}`).reply(400);
      mockAxiosAdapter.onGet(`${APIRoute.Balances}/${workoutId}`).reply(400);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${workoutId}`).reply(400);

      await store.dispatch(getWorkoutAction(workoutId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getWorkoutAction.pending.type,
        getWorkoutAction.rejected.type,
      ]);
    });
  });

  describe('updateWorkoutAction', () => {
    const workoutId = 'id';
    it('should dispatch "updateWorkoutAction.pending" and "updateWorkoutAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UpdateWorkout}/${workoutId}`)
        .reply(200, fullWorkoutData);

      await store.dispatch(updateWorkoutAction(workoutId));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const updateWorkoutActionFulfilled = actions.at(1) as ReturnType<
        typeof updateWorkoutAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        updateWorkoutAction.pending.type,
        updateWorkoutAction.fulfilled.type,
      ]);

      expect(updateWorkoutActionFulfilled.payload).toEqual(fullWorkoutData);
    });

    it('should dispatch "Action.pending" and "Action.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UpdateWorkout}/${workoutId}`)
        .reply(400);

      await store.dispatch(updateWorkoutAction(workoutId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        updateWorkoutAction.pending.type,
        updateWorkoutAction.rejected.type,
      ]);
    });

    it('should call "getUpdateWorkoutData" once with state and file', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UpdateWorkout}/${workoutId}`)
        .reply(200, fullWorkoutData);
      const mockGetUpdateWorkoutData = vi.spyOn(
        workoutDataFunctions,
        'getUpdateWorkoutData',
      );

      await store.dispatch(updateWorkoutAction(workoutId));

      expect(mockGetUpdateWorkoutData).toBeCalledTimes(1);
      expect(mockGetUpdateWorkoutData).toBeCalledWith(store.getState());
    });
  });

  describe('updateWorkoutVideoAction', () => {
    const workoutId = 'id';
    const fileData = makeFakeFileData();

    it('should dispatch "updateWorkoutVideoAction.pending" and "updateWorkoutVideoAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UpdateWorkoutVideo}/${workoutId}`)
        .reply(200, fileData);

      await store.dispatch(
        updateWorkoutVideoAction({ workoutId, video: fakeFile }),
      );
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const updateWorkoutVideoActionFulfilled = actions.at(1) as ReturnType<
        typeof updateWorkoutVideoAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        updateWorkoutVideoAction.pending.type,
        updateWorkoutVideoAction.fulfilled.type,
      ]);

      expect(updateWorkoutVideoActionFulfilled.payload).toEqual(fileData);
    });

    it('should dispatch "updateWorkoutVideoAction.pending" and "updateWorkoutVideoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UpdateWorkoutVideo}/${workoutId}`)
        .reply(400);

      await store.dispatch(
        updateWorkoutVideoAction({ workoutId, video: fakeFile }),
      );
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        updateWorkoutVideoAction.pending.type,
        updateWorkoutVideoAction.rejected.type,
      ]);
    });
  });

  describe('getAllWorkoutsAction', () => {
    it('should dispatch "getAllWorkoutsAction.pending" and "getAllWorkoutsAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Workouts)
        .reply(200, workoutsWithPagination);

      await store.dispatch(getAllWorkoutsAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getAllWorkoutsActionFulfilled = actions.at(1) as ReturnType<
        typeof getAllWorkoutsAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getAllWorkoutsAction.pending.type,
        getAllWorkoutsAction.fulfilled.type,
      ]);

      expect(getAllWorkoutsActionFulfilled.payload).toEqual(
        workoutsWithPagination,
      );
    });

    it('should dispatch "getAllWorkoutsAction.pending" and "getAllWorkoutsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Workouts).reply(400);

      await store.dispatch(getAllWorkoutsAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getAllWorkoutsAction.pending.type,
        getAllWorkoutsAction.rejected.type,
      ]);
    });

    it('should call "getAllWorkoutsQuery" once with state', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Workouts)
        .reply(200, workoutsWithPagination);
      const mockGetAllWorkoutsQuery = vi.spyOn(
        queryDataFunctions,
        'getAllWorkoutsQuery',
      );

      await store.dispatch(getAllWorkoutsAction());

      expect(mockGetAllWorkoutsQuery).toBeCalledTimes(1);
      expect(mockGetAllWorkoutsQuery).toBeCalledWith(store.getState());
    });
  });

  describe('getCoachWorkoutsAction', () => {
    it('should dispatch "getCoachWorkoutsAction.pending" and "getCoachWorkoutsAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.CoachWorkouts)
        .reply(200, workoutsWithPagination);

      await store.dispatch(getCoachWorkoutsAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getCoachWorkoutsActionFulfilled = actions.at(1) as ReturnType<
        typeof getCoachWorkoutsAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getCoachWorkoutsAction.pending.type,
        getCoachWorkoutsAction.fulfilled.type,
      ]);

      expect(getCoachWorkoutsActionFulfilled.payload).toEqual(
        workoutsWithPagination,
      );
    });

    it('should dispatch "getCoachWorkoutsAction.pending" and "getCoachWorkoutsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.CoachWorkouts).reply(400);

      await store.dispatch(getCoachWorkoutsAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getCoachWorkoutsAction.pending.type,
        getCoachWorkoutsAction.rejected.type,
      ]);
    });

    it('should call "getCoachWorkoutsQuery" once with state', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.CoachWorkouts)
        .reply(200, workoutsWithPagination);
      const mockGetCoachWorkoutsQuery = vi.spyOn(
        queryDataFunctions,
        'getCoachWorkoutsQuery',
      );

      await store.dispatch(getCoachWorkoutsAction());

      expect(mockGetCoachWorkoutsQuery).toBeCalledTimes(1);
      expect(mockGetCoachWorkoutsQuery).toBeCalledWith(store.getState());
    });
  });
});
