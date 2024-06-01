import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  decreaseWorkoutBalanceAction,
  getWorkoutId,
  isWorkoutBalanceActive,
  setActiveWorkout,
} from '../../store';

function VideoControls(): JSX.Element {
  const dispatch = useAppDispatch();
  const workoutId = useAppSelector(getWorkoutId);
  const isBalanceActive = useAppSelector(isWorkoutBalanceActive);

  return (
    <>
      <button
        className="btn training-video__button training-video__button--start"
        type="button"
        disabled={!isBalanceActive}
        onClick={() => {
          dispatch(decreaseWorkoutBalanceAction(workoutId));
        }}
        data-testid="startButton"
      >
        Приступить
      </button>
      <button
        className="btn training-video__button training-video__button--stop"
        type="button"
        onClick={() => {
          dispatch(setActiveWorkout());
        }}
        data-testid="finishButton"
      >
        Закончить
      </button>
    </>
  );
}

export default VideoControls;
