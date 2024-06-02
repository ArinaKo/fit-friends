import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormDateOfBirth,
  getUserFormDateOfBirthError,
  isUserFormDataSending,
  setDateOfBirth,
  setUserFormError,
} from '../../../store';
import { ChangeEvent } from 'react';
import { validateDateOfBirth } from '../../../utils';
import cn from 'classnames';
import dayjs from 'dayjs';

const DATA_FORMAT = 'YYYY-MM-DD';

function DateOfBirthInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const dateOfBirth = useAppSelector(getUserFormDateOfBirth);
  const dateOfBirthError = useAppSelector(getUserFormDateOfBirthError);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn('custom-input sign-in__input', {
        'custom-input--error': dateOfBirthError,
      })}
    >
      <label>
        <span className="custom-input__label">Дата рождения</span>
        <span className="custom-input__wrapper">
          <input
            type="date"
            name="dateOfBirth"
            value={
              dateOfBirth ? String(dayjs(dateOfBirth).format(DATA_FORMAT)) : ''
            }
            max="2099-12-31"
            disabled={isDisabled}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setDateOfBirth(target.value));
              if (validateDateOfBirth(target.value) !== dateOfBirthError) {
                dispatch(
                  setUserFormError([
                    'dateOfBirth',
                    validateDateOfBirth(target.value),
                  ])
                );
              }
            }}
            data-testid="dateInput"
          />
        </span>
        {dateOfBirthError && (
          <span className="custom-input__error">{dateOfBirthError}</span>
        )}
      </label>
    </div>
  );
}

export default DateOfBirthInput;
