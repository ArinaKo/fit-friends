import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormCaloriesPerDay,
  getUserFormCaloriesPerDayError,
  getUserFormCaloriesToLose,
  getUserFormCaloriesToLoseError,
  isUserFormDataSending,
  setCaloriesPerDay,
  setCaloriesToLose,
  setUserFormError,
} from '../../../store';
import { ChangeEvent } from 'react';
import cn from 'classnames';
import { CaloriesInputType } from './calories-input.mode';
import { validateCalories } from '../../../utils';

type CaloriesInputProps = {
  type: CaloriesInputType;
};

function CaloriesInput({ type }: CaloriesInputProps): JSX.Element {
  const isTypeToLose = type === CaloriesInputType.ToLose;
  const dispatch = useAppDispatch();
  const calories = useAppSelector(
    isTypeToLose ? getUserFormCaloriesToLose : getUserFormCaloriesPerDay
  );
  const caloriesError = useAppSelector(
    isTypeToLose
      ? getUserFormCaloriesToLoseError
      : getUserFormCaloriesPerDayError
  );
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn(
        'custom-input custom-input--with-text-right questionnaire-user__input',
        {
          'custom-input--error': caloriesError,
        }
      )}
    >
      <label>
        <span className="custom-input__wrapper">
          <input
            type="number"
            name={`calories-${isTypeToLose ? 'to-lose' : 'per-day'}`}
            value={calories}
            disabled={isDisabled}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              const newCalories = target.value;
              dispatch(
                isTypeToLose
                  ? setCaloriesToLose(newCalories)
                  : setCaloriesPerDay(newCalories)
              );
              if (validateCalories(newCalories) !== caloriesError) {
                dispatch(
                  setUserFormError([
                    isTypeToLose ? 'caloriesToLose' : 'caloriesPerDay',
                    validateCalories(newCalories),
                  ])
                );
              }
            }}
          />
          <span className="custom-input__text">ккал</span>
        </span>
        {caloriesError && (
          <span className="custom-input__error">{caloriesError}</span>
        )}
      </label>
    </div>
  );
}

export default CaloriesInput;
