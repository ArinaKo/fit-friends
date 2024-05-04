import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/index';
import {
  appData,
  userForm,
  userData,
  workoutForm,
  workoutsList,
} from './index';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.UserForm]: userForm.reducer,
  [NameSpace.UserData]: userData.reducer,
  [NameSpace.WorkoutForm]: workoutForm.reducer,
  [NameSpace.WorkoutsList]: workoutsList.reducer,
});
