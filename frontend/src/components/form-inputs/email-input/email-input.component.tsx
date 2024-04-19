import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormEmail,
  getUserFormEmailError,
  setEmail,
  setUserFormError,
} from '../../../store';
import { ChangeEvent } from 'react';
import { validateEmail } from '../../../utils';
import cn from 'classnames';

type EmailInputProps = {
  isDisabled: boolean;
};

function EmailInput({ isDisabled }: EmailInputProps): JSX.Element {
  const dispatch = useAppDispatch();
  const email = useAppSelector(getUserFormEmail);
  const emailError = useAppSelector(getUserFormEmailError);

  return (
    <div
      className={cn('custom-input sign-in__input', {
        'custom-input--error': emailError,
      })}
    >
      <label>
        <span className="custom-input__label">E-mail</span>
        <span className="custom-input__wrapper">
          <input
            type="email"
            name="email"
            value={email}
            disabled={isDisabled}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setEmail(target.value));
              if (validateEmail(target.value) !== emailError) {
                dispatch(
                  setUserFormError(['email', validateEmail(target.value)])
                );
              }
            }}
          />
        </span>
        {emailError && (
          <span className="custom-input__error">{emailError}</span>
        )}
      </label>
    </div>
  );
}

export default EmailInput;
