import { render, screen } from '@testing-library/react';
import {
  makeFakeAppDataSlice,
  makeFakeWorkoutFormSlice,
  makeFakeWorkoutInfoSlice,
  withStore,
} from '../../utils';
import WorkoutVideo from './workout-video.component';
import { AppData, WorkoutForm, WorkoutInfo } from '../../types';
import userEvent from '@testing-library/user-event';

describe('Component: WorkoutVideo', () => {
  const saveButtonText = 'Сохранить';
  const deleteButtonText = 'Удалить';
  const saveButtonTestId = 'saveButton';
  const deleteButtonTestId = 'deleteButton';
  const playButtonTestId = 'playButton';
  const videoTestId = 'video';
  const videoBlockTestId = 'videoBlock';
  const withInputClass = 'training-video--load';
  const activeClass = 'training-video--stop';
  const mockWorkoutInfoSlice = makeFakeWorkoutInfoSlice();
  const mockWorkoutFormSlice = makeFakeWorkoutFormSlice();
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockFile = new Blob();

  it('should render correct', () => {
    const expectedText = 'Видео';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      activeWorkout: undefined,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideo newVideo={null} setFile={vi.fn()} onSave={vi.fn()} />,
      {
        WORKOUT_INFO: mockWorkoutInfoSlice,
        WORKOUT_FORM: mockWorkoutFormSlice,
        APP_DATA: appDataSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(videoBlockTestId)).not.toHaveClass(activeClass);
    expect(screen.getByTestId(videoBlockTestId)).not.toHaveClass(
      withInputClass,
    );
    expect(screen.getByTestId(videoTestId)).toBeInTheDocument();
    expect(screen.getByTestId('playButton')).toBeInTheDocument();
  });

  it('should render correct when workout is active', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      activeWorkout: mockWorkoutInfoSlice.id,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideo newVideo={null} setFile={vi.fn()} onSave={vi.fn()} />,
      {
        WORKOUT_INFO: mockWorkoutInfoSlice,
        WORKOUT_FORM: mockWorkoutFormSlice,
        APP_DATA: appDataSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(videoBlockTestId)).toHaveClass(activeClass);
    expect(screen.getByTestId(videoBlockTestId)).not.toHaveClass(
      withInputClass,
    );
  });

  it('should render correct when workout is editing', () => {
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataEditing: true,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideo newVideo={null} setFile={vi.fn()} onSave={vi.fn()} />,
      {
        WORKOUT_INFO: workoutInfoSlice,
        WORKOUT_FORM: mockWorkoutFormSlice,
        APP_DATA: mockAppDataSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(saveButtonText)).toBeInTheDocument();
    expect(screen.getByText(deleteButtonText)).toBeInTheDocument();
    expect(screen.getByTestId(videoBlockTestId)).not.toHaveClass(activeClass);
    expect(screen.getByTestId(videoBlockTestId)).not.toHaveClass(
      withInputClass,
    );
    expect(screen.getByTestId(saveButtonTestId)).toBeDisabled();
    expect(screen.getByTestId(deleteButtonTestId)).not.toBeDisabled();
  });

  it('should render correct when user click play button', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      activeWorkout: mockWorkoutInfoSlice.id,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideo newVideo={null} setFile={vi.fn()} onSave={vi.fn()} />,
      {
        WORKOUT_INFO: mockWorkoutInfoSlice,
        WORKOUT_FORM: mockWorkoutFormSlice,
        APP_DATA: appDataSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(playButtonTestId));

    expect(screen.getByTestId(videoBlockTestId)).toHaveClass(activeClass);
    expect(screen.queryByTestId(playButtonTestId)).not.toBeInTheDocument();
  });

  it('should render correct when video deleted', () => {
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataEditing: true,
    };
    const workoutFormSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: false,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideo newVideo={null} setFile={vi.fn()} onSave={vi.fn()} />,
      {
        WORKOUT_INFO: workoutInfoSlice,
        WORKOUT_FORM: workoutFormSlice,
        APP_DATA: mockAppDataSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(videoBlockTestId)).toHaveClass(withInputClass);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByTestId(saveButtonTestId)).toBeDisabled();
    expect(screen.getByTestId(deleteButtonTestId)).toBeDisabled();
  });

  it('should render correct when new file uploaded', () => {
    global.URL.createObjectURL = vi.fn(() => '');
    const workoutInfoSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataEditing: true,
    };
    const workoutFormSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: true,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideo newVideo={mockFile} setFile={vi.fn()} onSave={vi.fn()} />,
      {
        WORKOUT_INFO: workoutInfoSlice,
        WORKOUT_FORM: workoutFormSlice,
        APP_DATA: mockAppDataSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(videoBlockTestId)).not.toHaveClass(
      withInputClass,
    );
    expect(screen.getByTestId(saveButtonTestId)).not.toBeDisabled();
    expect(screen.getByTestId(deleteButtonTestId)).not.toBeDisabled();
  });
});
