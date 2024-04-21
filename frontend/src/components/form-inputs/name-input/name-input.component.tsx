import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormName,
  getUserFormNameError,
  isUserFormDataSending,
  setName,
  setUserFormError,
} from '../../../store';
import { ChangeEvent } from 'react';
import { validateName } from '../../../utils';
import cn from 'classnames';

function NameInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const name = useAppSelector(getUserFormName);
  const nameError = useAppSelector(getUserFormNameError);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn('custom-input sign-in__input', {
        'custom-input--error': nameError,
      })}
    >
      <label>
        <span className="custom-input__label">Имя</span>
        <span className="custom-input__wrapper">
          <input
            type="name"
            name="name"
            value={name}
            disabled={isDisabled}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setName(target.value));
              if (validateName(target.value) !== nameError) {
                dispatch(
                  setUserFormError(['name', validateName(target.value)])
                );
              }
            }}
          />
        </span>
        {nameError && <span className="custom-input__error">{nameError}</span>}
      </label>
    </div>
  );
}

export default NameInput;
