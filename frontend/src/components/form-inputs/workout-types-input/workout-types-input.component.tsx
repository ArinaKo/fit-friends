import { WORKOUT_TYPE_MAX_AMOUNT, WorkoutType } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormWorkoutTypes,
  isUserFormDataSending,
  setWorkoutTypes,
} from '../../../store';
import { ChangeEvent } from 'react';
import lodash from 'lodash';

function WorkoutTypesInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const workoutTypes = useAppSelector(getUserFormWorkoutTypes);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div className="specialization-checkbox questionnaire-user__specializations">
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
                }
              }}
            />
            <span className="btn-checkbox__btn">{lodash.capitalize(type)}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default WorkoutTypesInput;
