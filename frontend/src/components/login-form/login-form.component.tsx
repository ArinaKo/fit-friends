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
import { EmailInput, PasswordInput } from '../form-inputs';

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
        <EmailInput isDisabled={isSending} />
        <PasswordInput isDisabled={isSending} />
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
