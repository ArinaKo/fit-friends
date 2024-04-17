import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/index';
import { appData, userForm } from './index';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.UserForm]: userForm.reducer,
});
