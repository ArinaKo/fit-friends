import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/index';
import { appData, userForm, userData } from './index';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.UserForm]: userForm.reducer,
  [NameSpace.UserData]: userData.reducer,
});
