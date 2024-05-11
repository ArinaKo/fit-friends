import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isCurrentWorkoutActive,
  isWorkoutFormHasVideo,
  setVideoPresence,
} from '../../store';
import { WorkoutVideoInput } from '../form-inputs';
import { getWorkoutVideo } from '../../store';
import { getFileUrl } from '../../utils';
import UIBlocker from '../ui-blocker/ui-blocker.component';
import VideoControls from './video-controls.component';
import PlayButton from './play-button.component';
import cn from 'classnames';

type WorkoutVideoProps = {
  isEdited: boolean;
  newVideo: Blob | null;
  setFile: (file: File | null) => void;
};

function WorkoutVideo({
  isEdited,
  newVideo,
  setFile,
}: WorkoutVideoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const video = useAppSelector(getWorkoutVideo);
  const hasVideo = useAppSelector(isWorkoutFormHasVideo);
  const isWorkoutActive = useAppSelector(isCurrentWorkoutActive);

  const [isPlaying, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isEdited) {
      dispatch(setVideoPresence(true));
    }
  }, [dispatch, isEdited]);

  const handlePlayButtonClick = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  if (!video) {
    return <UIBlocker />;
  }

  return (
    <div
      className={cn('training-video', {
        'training-video--load': isEdited && !hasVideo,
        'training-video--stop': isWorkoutActive,
      })}
    >
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          <video
            ref={videoRef}
            width={922}
            height={566}
            controls={isPlaying}
            src={
              isEdited && newVideo
                ? URL.createObjectURL(newVideo)
                : getFileUrl(video)
            }
          />
        </div>
        {isPlaying ? undefined : <PlayButton onClick={handlePlayButtonClick} />}
      </div>
      <div className="training-video__drop-files">
        <form action="#" method="post">
          <div className="training-video__form-wrapper">
            <WorkoutVideoInput setFile={setFile} />
          </div>
        </form>
      </div>
      <VideoControls isEdited={isEdited} />
    </div>
  );
}

export default WorkoutVideo;
