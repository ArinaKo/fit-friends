import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutsListSlice,
  withStore,
} from '../../../utils';
import SortingInput from './sorting-input.component';
import { WorkoutsList } from '../../../types';
import { resetCatalogPage, setWorkoutsSorting } from '../../../store';
import { SortingInputType } from './sorting-input';
import { WorkoutsSortType } from '../../../const';

describe('Component: SortingInput', () => {
  const inputTestId = 'sorting';
  const mockWorkoutsListSlice = makeFakeWorkoutsListSlice();

  it('should render correct when no sorting is selected', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        ...mockWorkoutsListSlice.filter,
        sorting: undefined,
      },
    };
    const { withStoreComponent } = withStore(
      <SortingInput type={SortingInputType.Workouts} styleClass="" />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);
    const allInputs = screen.getAllByTestId(inputTestId);

    allInputs.forEach((input) => {
      expect(input).not.toBeChecked();
    });

    expect(screen.getAllByTestId(inputTestId)).toHaveLength(3);
  });

  it('should render correct when sorting is selected', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        ...mockWorkoutsListSlice.filter,
        sorting: WorkoutsSortType.Free,
      },
    };
    const { withStoreComponent } = withStore(
      <SortingInput type={SortingInputType.Workouts} styleClass="" />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByLabelText('Бесплатно')).toBeChecked();
    expect(screen.getByLabelText('Дешевле')).not.toBeChecked();
    expect(screen.getByLabelText('Дороже')).not.toBeChecked();
  });

  it('should dispatch "resetCatalogPage" and "setWorkoutsSorting" when sorting is changed', () => {
    const { withStoreComponent, mockStore } = withStore(
      <SortingInput type={SortingInputType.Workouts} styleClass="" />,
      {
        WORKOUTS_LIST: mockWorkoutsListSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.click(screen.getAllByTestId(inputTestId)[0]);
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      resetCatalogPage.type,
      setWorkoutsSorting.type,
    ]);
  });
});
