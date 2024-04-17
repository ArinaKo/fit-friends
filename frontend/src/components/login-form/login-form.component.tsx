import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getUserFormEmail,
  getUserFormPassword,
  isUserFormDataSending,
  setEmail,
  setPassword,
} from '../../store';
import { loginAction } from '../../store/api-actions';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(isUserFormDataSending);
  const email = useAppSelector(getUserFormEmail);
  const password = useAppSelector(getUserFormPassword);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="sign-in">
        <div className="custom-input sign-in__input">
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
                }}
              />
            </span>
          </label>
        </div>
        <div className="custom-input sign-in__input">
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
                }}
              />
            </span>
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
