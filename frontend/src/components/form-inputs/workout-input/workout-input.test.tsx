import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutFormSlice,
  makeFakeWorkoutInfoSlice,
  withStore,
} from '../../../utils';
import WorkoutInput from './workout-input.component';
import { WorkoutForm } from '../../../types';
import { setWorkoutDescription, setWorkoutFormError } from '../../../store';
import { WorkoutInputType } from './workout-input';
import userEvent from '@testing-library/user-event';

describe('Component: WorkoutInput', () => {
  const inputTestId = 'workoutInput';
  const mockWorkoutFormSlice = makeFakeWorkoutFormSlice();
  const mockWorkoutInfoSlice = makeFakeWorkoutInfoSlice();

  it('should render correct', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      description: 'Description',
    };
    const { withStoreComponent } = withStore(
      <WorkoutInput type={WorkoutInputType.Description} isActive />,
      {
        WORKOUT_FORM: mockSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('Описание тренировки')).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toHaveValue('Description');
  });

  it('should dispatch "setWorkoutDescription" when user type valid value', async () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      description: 'Descriptio',
    };
    const { withStoreComponent, mockStore } = withStore(
      <WorkoutInput type={WorkoutInputType.Description} isActive />,
      {
        WORKOUT_FORM: mockSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), 'n');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setWorkoutDescription.type,
      setWorkoutDescription.type,
    ]);
  });

  it('should dispatch "setWorkoutDescription" and "setWorkoutFormError" when user type invalid value', async () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      description: '',
    };
    const { withStoreComponent, mockStore } = withStore(
      <WorkoutInput type={WorkoutInputType.Description} isActive />,
      {
        WORKOUT_FORM: mockSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), '2');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setWorkoutDescription.type,
      setWorkoutDescription.type,
      setWorkoutFormError.type,
    ]);
  });

  it('should display error message when it exists', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      validationErrors: {
        ...mockWorkoutFormSlice.validationErrors,
        description: 'error',
      },
    };
    const { withStoreComponent } = withStore(
      <WorkoutInput type={WorkoutInputType.Description} isActive />,
      {
        WORKOUT_FORM: mockSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
