import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types';

export type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
