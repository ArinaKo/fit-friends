import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormPassword,
  getUserFormPasswordError,
  isUserFormDataSending,
  setPassword,
  setUserFormError,
} from '../../../store';
import { ChangeEvent } from 'react';
import { validatePassword } from '../../../utils';
import cn from 'classnames';

function PasswordInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const password = useAppSelector(getUserFormPassword);
  const passwordError = useAppSelector(getUserFormPasswordError);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn('custom-input sign-in__input', {
        'custom-input--error': passwordError,
      })}
    >
      <label>
        <span className="custom-input__label">Пароль</span>
        <span className="custom-input__wrapper">
          <input
            type="password"
            name="password"
            value={password}
            disabled={isDisabled}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setPassword(target.value));
              if (validatePassword(target.value) !== passwordError) {
                dispatch(
                  setUserFormError(['password', validatePassword(target.value)])
                );
              }
            }}
          />
        </span>
        {passwordError && (
          <span className="custom-input__error">{passwordError}</span>
        )}
      </label>
    </div>
  );
}

export default PasswordInput;
