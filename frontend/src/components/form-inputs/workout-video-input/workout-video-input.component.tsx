import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getWorkoutFormVideoError,
  isWorkoutFormDataSending,
  isWorkoutFormHasVideo,
  setVideoPresence,
  setWorkoutFormError,
} from '../../../store';
import cn from 'classnames';

type WorkoutVideoInputProps = {
  setFile: (file: File | null) => void;
  styleClass?: string;
};

function WorkoutVideoInput({ setFile, styleClass }: WorkoutVideoInputProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isVideoUpload = useAppSelector(isWorkoutFormHasVideo);
  const videoError = useAppSelector(getWorkoutFormVideoError);
  const isDisabled = useAppSelector(isWorkoutFormDataSending);

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files) {
      setFile(null);
      dispatch(setVideoPresence(false));
      return;
    }

    setFile(evt.target.files[0]);
    dispatch(setVideoPresence(true));
    dispatch(setWorkoutFormError(['video', undefined]));
  }

  return (
    <div
      className={cn('drag-and-drop', styleClass, {
        'custom-input--error': videoError,
      })}
    >
      <label>
        <span className="drag-and-drop__label" tabIndex={0}>
          {isVideoUpload
            ? 'Видео загружено'
            : 'Загрузите сюда файл формата MOV, AVI или MP4'}
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref="#icon-import-video" />
          </svg>
        </span>
        <input
          type="file"
          name="video"
          tabIndex={-1}
          accept=".mov, .avi, .mp4"
          disabled={isDisabled}
          onChange={handleFileChange}
        />
        {videoError && (
          <span className="custom-input__error">{videoError}</span>
        )}
      </label>
    </div>
  );
}

export default WorkoutVideoInput;
