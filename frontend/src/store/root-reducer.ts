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
  friendsList,
} from './index';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.UserForm]: userForm.reducer,
  [NameSpace.UserData]: userData.reducer,
  [NameSpace.WorkoutForm]: workoutForm.reducer,
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.WorkoutsList]: workoutsList.reducer,
  [NameSpace.OrdersList]: ordersList.reducer,
  [NameSpace.BalancesList]: balancesList.reducer,
  [NameSpace.FriendsList]: friendsList.reducer,
});
