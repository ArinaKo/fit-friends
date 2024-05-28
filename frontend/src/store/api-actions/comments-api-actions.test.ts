import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeComment,
  makeFakeState,
  makeFakeWorkout,
} from '../../utils';
import { APIRoute } from '../../const';
import { sendCommentAction } from './comments-api-actions';
import * as commentDataFunctions from '../../utils/comment-form-data';

describe('Comments async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const fakeWorkout = makeFakeWorkout();
  const fakeComment = makeFakeComment();

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('sendCommentAction', () => {
    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.fulfilled" with thunk "Action', async () => {
      const workoutId = store.getState().COMMENT_FORM?.workoutId;
      mockAxiosAdapter.onPost(APIRoute.Comments).reply(201, fakeComment);
      mockAxiosAdapter
        .onGet(`${APIRoute.Workouts}/${workoutId ?? ''}`)
        .reply(200, fakeWorkout);
      const expectedPayload = {
        comment: fakeComment,
        rating: fakeWorkout.rating,
      };

      await store.dispatch(sendCommentAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const sendCommentActionFulfilled = actions.at(1) as ReturnType<
        typeof sendCommentAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.fulfilled.type,
      ]);

      expect(sendCommentActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.rejected" when server response 400', async () => {
      const workoutId = store.getState().COMMENT_FORM?.workoutId;
      mockAxiosAdapter.onPost(APIRoute.Comments).reply(400);
      mockAxiosAdapter
        .onGet(`${APIRoute.Workouts}/${workoutId ?? ''}`)
        .reply(400);

      await store.dispatch(sendCommentAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.rejected.type,
      ]);
    });

    it('should call "getCommentData" once with state and file', async () => {
      const workoutId = store.getState().COMMENT_FORM?.workoutId;
      mockAxiosAdapter.onPost(APIRoute.Comments).reply(201, fakeComment);
      mockAxiosAdapter
        .onGet(`${APIRoute.Workouts}/${workoutId ?? ''}`)
        .reply(200, fakeWorkout);
      const mockGetCommentData = vi.spyOn(
        commentDataFunctions,
        'getCommentData',
      );

      await store.dispatch(sendCommentAction());

      expect(mockGetCommentData).toBeCalledTimes(1);
      expect(mockGetCommentData).toBeCalledWith(store.getState());
    });
  });
});
