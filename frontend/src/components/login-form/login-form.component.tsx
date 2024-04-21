import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isUserFormDataSending,
  isUserFormHaveErrors,
  setLoginRequiredFields,
} from '../../store';
import { loginAction } from '../../store/api-actions';
import { EmailInput, PasswordInput } from '../form-inputs';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(isUserFormDataSending);
  const isFormHaveError = useAppSelector(isUserFormHaveErrors);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(setLoginRequiredFields());
    if (!isFormHaveError) {
      dispatch(loginAction());
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="sign-in">
        <EmailInput />
        <PasswordInput />
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
