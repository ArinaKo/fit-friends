import { render, screen } from '@testing-library/react';
import {
  makeFakeAppDataSlice,
  makeFakeWorkoutInfoSlice,
  withStore,
} from '../../utils';
import PlayButton from './play-button.component';
import { AppData, WorkoutInfo } from '../../types';
import { UserRole } from '../../const';

describe('Component: PlayButton', () => {
  const buttonTestId = 'playButton';
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockWorkoutInfoSlice = makeFakeWorkoutInfoSlice();

  it('should render correct for coach', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const { withStoreComponent } = withStore(
      <PlayButton onClick={() => undefined} />,
      {
        APP_DATA: appDataSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(buttonTestId)).not.toBeDisabled();
  });

  it('should render correct for customer', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
      activeWorkout: undefined,
    };
    const { withStoreComponent } = withStore(
      <PlayButton onClick={() => undefined} />,
      {
        APP_DATA: appDataSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(buttonTestId)).toBeDisabled();
  });

  it('should render correct when workout is active', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      activeWorkout: 'id',
    };
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      id: 'id',
    };
    const { withStoreComponent } = withStore(
      <PlayButton onClick={() => undefined} />,
      {
        APP_DATA: appDataSlice,
        WORKOUT_INFO: workoutInfoSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(buttonTestId)).not.toBeDisabled();
  });
});
