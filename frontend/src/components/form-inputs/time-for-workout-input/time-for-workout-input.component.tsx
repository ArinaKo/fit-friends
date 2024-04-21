import { WorkoutDuration } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormTimeForWorkout,
  isUserFormDataSending,
  setTimeForWorkout,
} from '../../../store';
import { ChangeEvent } from 'react';

function TimeForWorkoutInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const timeForWorkout = useAppSelector(getUserFormTimeForWorkout);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div className="specialization-checkbox questionnaire-user__specializations">
      {Object.values(WorkoutDuration).map((duration) => (
        <div className="btn-checkbox" key={`duration-${duration}`}>
          <label>
            <input
              className="visually-hidden"
              type="checkbox"
              name="workoutType"
              value={duration}
              disabled={isDisabled}
              checked={timeForWorkout === duration}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                dispatch(setTimeForWorkout(target.value as WorkoutDuration));
              }}
            />
            <span className="btn-checkbox__btn">{duration}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default TimeForWorkoutInput;
