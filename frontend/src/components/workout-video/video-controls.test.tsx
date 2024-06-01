import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutInfoSlice,
  withStore,
} from '../../utils';
import VideoControls from './video-controls.component';
import { WorkoutInfo } from '../../types';
import userEvent from '@testing-library/user-event';
import { decreaseWorkoutBalanceAction, setActiveWorkout } from '../../store';
import { APIRoute } from '../../const';

describe('Component: VideoControls', () => {
  const startButtonText = 'Приступить';
  const finishButtonText = 'Закончить';
  const startButtonTestId = 'startButton';
  const finishButtonTestId = 'finishButton';
  const mockWorkoutInfoSlice = makeFakeWorkoutInfoSlice();

  it('should render correct when balance in not active', () => {
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      balance: 0,
    };
    const { withStoreComponent } = withStore(<VideoControls />, {
      WORKOUT_INFO: workoutInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(startButtonText)).toBeInTheDocument();
    expect(screen.getByText(finishButtonText)).toBeInTheDocument();
    expect(screen.getByTestId(startButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(finishButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(startButtonTestId)).toBeDisabled();
  });

  it('should render correct when balance in active', () => {
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      balance: 1,
    };
    const { withStoreComponent } = withStore(<VideoControls />, {
      WORKOUT_INFO: workoutInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(startButtonText)).toBeInTheDocument();
    expect(screen.getByText(finishButtonText)).toBeInTheDocument();
    expect(screen.getByTestId(startButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(finishButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(startButtonTestId)).not.toBeDisabled();
  });

  it('should dispatch "decreaseWorkoutBalanceAction.pending" and "decreaseWorkoutBalanceAction.fulfilled" when user click start button', async () => {
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      balance: 2,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <VideoControls />,
      {
        WORKOUT_INFO: workoutInfoSlice,
      },
    );
    mockAxiosAdapter
      .onPatch(`${APIRoute.DecreaseBalance}/${workoutInfoSlice.id}`)
      .reply(200, {
        count: 1,
      });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(startButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      decreaseWorkoutBalanceAction.pending.type,
      decreaseWorkoutBalanceAction.fulfilled.type,
    ]);
  });

  it('should dispatch "setActiveWorkout" when user click start button', async () => {
    const { withStoreComponent, mockStore } = withStore(<VideoControls />, {
      WORKOUT_INFO: mockWorkoutInfoSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(finishButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setActiveWorkout.type]);
  });
});
