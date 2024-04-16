import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/index';
import { appData } from './index';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
});
