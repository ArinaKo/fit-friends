import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutsListSlice,
  withStore,
} from '../../../utils';
import CheckboxInput from './checkbox-input.component';
import { WorkoutsList } from '../../../types';
import { resetCatalogPage, setWorkoutsTypesFilter } from '../../../store';
import { CheckboxInputType } from './checkbox-input';
import { WorkoutType } from '../../../const';

describe('Component: CheckboxInput', () => {
  const inputTestId = 'checkbox';
  const mockWorkoutsListSlice = makeFakeWorkoutsListSlice();

  it('should render correct when not one box is checked', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        ...mockWorkoutsListSlice.filter,
        types: [],
      },
    };
    const { withStoreComponent } = withStore(
      <CheckboxInput type={CheckboxInputType.TypeOfWorkout} styleClass="" />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);
    const allInputs = screen.getAllByTestId(inputTestId);

    allInputs.forEach((input) => {
      expect(input).not.toBeChecked();
    });

    expect(screen.getAllByTestId(inputTestId)).toHaveLength(8);
  });

  it('should render correct when some boxes are checked', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        ...mockWorkoutsListSlice.filter,
        types: [WorkoutType.Yoga, WorkoutType.Running],
      },
    };
    const { withStoreComponent } = withStore(
      <CheckboxInput type={CheckboxInputType.TypeOfWorkout} styleClass="" />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByLabelText('бег')).toBeChecked();
    expect(screen.getByLabelText('йога')).toBeChecked();
  });

  it('should dispatch "resetCatalogPage" and "setWorkoutsTypesFilter" when input change', () => {
    const { withStoreComponent, mockStore } = withStore(
      <CheckboxInput type={CheckboxInputType.TypeOfWorkout} styleClass="" />,
      {
        WORKOUTS_LIST: mockWorkoutsListSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.click(screen.getAllByTestId(inputTestId)[0]);
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      resetCatalogPage.type,
      setWorkoutsTypesFilter.type,
    ]);
  });
});
