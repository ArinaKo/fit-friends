import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/index';
import { appData } from './app-data/app-data';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
});
