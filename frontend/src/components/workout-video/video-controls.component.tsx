import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  decreaseWorkoutBalanceAction,
  getWorkoutId,
  isWorkoutBalanceActive,
  setActiveWorkout,
  setVideoPresence,
} from '../../store';

type VideoControlsProps = {
  isEdited: boolean;
};

function VideoControls({
  isEdited,
}: VideoControlsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const workoutId = useAppSelector(getWorkoutId);
  const isBalanceActive = useAppSelector(isWorkoutBalanceActive);

  return (
    <div className="training-video__buttons-wrapper">
      {!isEdited ? (
        <>
          <button
            className="btn training-video__button training-video__button--start"
            type="button"
            disabled={!isBalanceActive}
            onClick={() => {
              dispatch(decreaseWorkoutBalanceAction(workoutId as string));
            }}
          >
            Приступить
          </button>
          <button
            className="btn training-video__button training-video__button--stop"
            type="button"
            onClick={() => {
              dispatch(setActiveWorkout());
            }}
          >
            Закончить
          </button>
        </>
      ) : (
        <div className="training-video__edit-buttons">
          <button className="btn" type="button">
            Сохранить
          </button>
          <button
            className="btn btn--outlined"
            type="button"
            onClick={() => {
              dispatch(setVideoPresence(false));
            }}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoControls;
