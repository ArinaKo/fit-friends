import { WORKOUT_TYPE_MAX_AMOUNT, WorkoutType } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormWorkoutTypes,
  getUserFormWorkoutTypesError,
  isUserFormDataSending,
  setUserFormError,
  setWorkoutTypes,
} from '../../../store';
import { ChangeEvent } from 'react';
import lodash from 'lodash';
import cn from 'classnames';

function WorkoutTypesInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const workoutTypes = useAppSelector(getUserFormWorkoutTypes);
  const workoutTypesError = useAppSelector(getUserFormWorkoutTypesError);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn(
        'specialization-checkbox questionnaire-user__specializations',
        {
          'specialization-checkbox--error': workoutTypesError,
        },
      )}
    >
      {Object.values(WorkoutType).map((type) => (
        <div className="btn-checkbox" key={`type-${type}`}>
          <label>
            <input
              className="visually-hidden"
              type="checkbox"
              name="workoutType"
              value={type}
              disabled={isDisabled}
              checked={workoutTypes.includes(type)}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                const editedType = target.value as WorkoutType;
                if (
                  workoutTypes.length < WORKOUT_TYPE_MAX_AMOUNT ||
                  workoutTypes.includes(editedType)
                ) {
                  dispatch(setWorkoutTypes(editedType));
                  dispatch(setUserFormError(['workoutTypes', undefined]));
                }
              }}
            />
            <span className="btn-checkbox__btn">{lodash.capitalize(type)}</span>
          </label>
        </div>
      ))}
      {workoutTypesError && (
        <span className="specialization-checkbox__error">{workoutTypesError}</span>
      )}
    </div>
  );
}

export default WorkoutTypesInput;
