import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutFormSlice,
  withStore,
} from '../../../utils';
import WorkoutVideoInput from './workout-video-input.component';
import { WorkoutForm } from '../../../types';
import { setVideoPresence, setWorkoutFormError } from '../../../store';

describe('Component: WorkoutVideoInput', () => {
  const inputTestId = 'fileInput';
  const mockWorkoutFormSlice = makeFakeWorkoutFormSlice();
  const mockSetFile = vi.fn();
  const mockFile = new File([], '');

  it('should render correct when empty', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: false,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideoInput setFile={mockSetFile} />,
      {
        WORKOUT_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(
      screen.getByText('Загрузите сюда файл формата MOV, AVI или MP4'),
    ).toBeInTheDocument();
  });

  it('should render correct when not empty', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: true,
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideoInput setFile={mockSetFile} />,
      {
        WORKOUT_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(screen.getByText('Видео загружено')).toBeInTheDocument();
  });

  it('should call "setFile" and dispatch "setVideoPresence" and "setWorkoutFormError" when file uploaded', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: true,
    };
    const { withStoreComponent, mockStore } = withStore(
      <WorkoutVideoInput setFile={mockSetFile} />,
      {
        WORKOUT_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.change(screen.getByTestId(inputTestId), {
      target: { files: [mockFile] },
    });
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setVideoPresence.type,
      setWorkoutFormError.type,
    ]);
    expect(mockSetFile).toBeCalledTimes(1);
    expect(mockSetFile).toBeCalledWith(mockFile);
  });

  it('should render error message when it exists', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      validationErrors: {
        ...mockWorkoutFormSlice.validationErrors,
        video: 'error',
      },
    };
    const { withStoreComponent } = withStore(
      <WorkoutVideoInput setFile={mockSetFile} />,
      {
        WORKOUT_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
