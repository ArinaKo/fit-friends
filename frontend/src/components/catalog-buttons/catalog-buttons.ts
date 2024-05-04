import {
  increaseWorkoutsPage,
  isAllWorkouts,
  isWorkoutsScrollActive,
} from '../../store';
import { State } from '../../types';

export enum CatalogButtonsType {
  Workouts = 'workouts',
}

type CatalogButtonsTypeDiff = {
  increasePageAction: () => { payload: undefined; type: string };
  isAllSelector: (state: State) => boolean;
  isScrollActiveSelector: (state: State) => boolean;
};

type CatalogButtonsTypeDiffs = {
  [type: string]: CatalogButtonsTypeDiff;
};

export const CatalogButtonsTypeDiffs: CatalogButtonsTypeDiffs = {
  [CatalogButtonsType.Workouts]: {
    increasePageAction: increaseWorkoutsPage,
    isAllSelector: isAllWorkouts,
    isScrollActiveSelector: isWorkoutsScrollActive,
  },
};
