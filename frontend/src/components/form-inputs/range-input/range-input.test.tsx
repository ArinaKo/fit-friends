import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutsListSlice,
  withStore,
} from '../../../utils';
import RangeInput from './range-input.component';
import { WorkoutsList } from '../../../types';
import { resetCatalogPage, setWorkoutsPriceFilter } from '../../../store';
import { RangeInputType } from './range-input';
import userEvent from '@testing-library/user-event';

describe('Component: RangeInput', () => {
  const inputMinValueTestId = 'inputMinValue';
  const inputMaxValueTestId = 'inputMaxValue';
  const toggleMinValueTestId = 'toggleMinValue';
  const toggleMaxValueTestId = 'toggleMaxValue';
  const mockWorkoutsListSlice = makeFakeWorkoutsListSlice();

  it('should render correct', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        ...mockWorkoutsListSlice.filter,
        price: {
          min: 100,
          max: 500,
        },
      },
    };
    const { withStoreComponent } = withStore(
      <RangeInput type={RangeInputType.WorkoutPrice} />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getAllByDisplayValue(100)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(500)).toHaveLength(2);
    expect(screen.getByTestId(inputMinValueTestId)).toBeInTheDocument();
    expect(screen.getByTestId(inputMaxValueTestId)).toBeInTheDocument();
    expect(screen.getByTestId(toggleMinValueTestId)).toBeInTheDocument();
    expect(screen.getByTestId(toggleMaxValueTestId)).toBeInTheDocument();
  });

  it('should dispatch "resetCatalogPage" and "setWorkoutsPriceFilter" when value change', async () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      isDataLoading: false,
      price: {
        min: 10,
        max: 5000,
      },
      filter: {
        ...mockWorkoutsListSlice.filter,
        price: {
          min: 10,
          max: 500,
        },
      },
    };
    const { withStoreComponent, mockStore } = withStore(
      <RangeInput type={RangeInputType.WorkoutPrice} />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputMinValueTestId), '0');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      resetCatalogPage.type,
      setWorkoutsPriceFilter.type,
    ]);
  });
});
