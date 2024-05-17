import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/index';
import {
  appData,
  userForm,
  userData,
  workoutForm,
  catalogData,
  workoutsList,
  ordersList,
  balancesList,
  usersList,
  workoutInfo,
  userInfo,
  mainData,
  commentForm,
  orderForm,
} from './index';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.MainData]: mainData.reducer,
  [NameSpace.UserForm]: userForm.reducer,
  [NameSpace.UserData]: userData.reducer,
  [NameSpace.WorkoutForm]: workoutForm.reducer,
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.WorkoutsList]: workoutsList.reducer,
  [NameSpace.OrdersList]: ordersList.reducer,
  [NameSpace.BalancesList]: balancesList.reducer,
  [NameSpace.UsersList]: usersList.reducer,
  [NameSpace.WorkoutInfo]: workoutInfo.reducer,
  [NameSpace.UserInfo]: userInfo.reducer,
  [NameSpace.CommentForm]: commentForm.reducer,
  [NameSpace.OrderForm]: orderForm.reducer,
});
