import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import WorkoutTypesInput from './workout-types-input.component';
import { UserForm } from '../../../types';
import { setWorkoutTypes, setUserFormError } from '../../../store';
import { WorkoutType } from '../../../const';

describe('Component: WorkoutTypesInput', () => {
  const inputTestId = 'workoutTypes';
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct when not one box is checked', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      workoutTypes: [],
    };
    const { withStoreComponent } = withStore(
      <WorkoutTypesInput isActive styleClass="" />,
      {
        USER_FORM: mockSlice,
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
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      workoutTypes: [WorkoutType.Running, WorkoutType.Yoga],
    };
    const { withStoreComponent } = withStore(
      <WorkoutTypesInput isActive styleClass="" />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByLabelText('Бег')).toBeChecked();
    expect(screen.getByLabelText('Йога')).toBeChecked();
  });

  it('should dispatch "setWorkoutTypes" and "setUserFormError" when input change', () => {
    const { withStoreComponent, mockStore } = withStore(
      <WorkoutTypesInput isActive styleClass="" />,
      {
        USER_FORM: mockUserFormSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.click(screen.getAllByTestId(inputTestId)[0]);
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setWorkoutTypes.type, setUserFormError.type]);
  });
});
