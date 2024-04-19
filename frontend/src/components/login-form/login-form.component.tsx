import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getUserFormEmail,
  getUserFormEmailError,
  getUserFormPassword,
  getUserFormPasswordError,
  isUserFormDataSending,
  setEmail,
  setPassword,
  setUserFormError,
} from '../../store';
import { loginAction } from '../../store/api-actions';
import cn from 'classnames';
import { validateEmail, validatePassword } from '../../utils';
import { REQUIRED_INPUT_MESSAGE } from '../../const';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(isUserFormDataSending);
  const email = useAppSelector(getUserFormEmail);
  const emailError = useAppSelector(getUserFormEmailError);
  const password = useAppSelector(getUserFormPassword);
  const passwordError = useAppSelector(getUserFormPasswordError);

  const isSubmitAvailable = (): boolean => {
    if (!email) {
      dispatch(setUserFormError(['email', REQUIRED_INPUT_MESSAGE]));
    }
    if (!password) {
      dispatch(setUserFormError(['password', REQUIRED_INPUT_MESSAGE]));
    }
    return !emailError && !passwordError;
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (isSubmitAvailable()) {
      dispatch(loginAction({ email, password }));
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="sign-in">
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
                disabled={isSending}
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
                disabled={isSending}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                  dispatch(setPassword(target.value));
                  if (validatePassword(target.value) !== passwordError) {
                    dispatch(
                      setUserFormError([
                        'password',
                        validatePassword(target.value),
                      ])
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
        <button
          className="btn sign-in__button"
          type="submit"
          disabled={isSending}
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
