import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isUserFormDataSending,
  isUserFormHaveErrors,
  setRegisterRequiredFields,
} from '../../store';
import { AppRoute } from '../../const';
import { registerAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/actions';
import {
  AvatarInput,
  DateOfBirthInput,
  LocationInput,
  RoleInput,
  TextInput,
  TextInputType,
  UserSexInput,
} from '../form-inputs';

function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(isUserFormDataSending);
  const isFormHaveError = useAppSelector(isUserFormHaveErrors);
  const [isAgree, setAgreement] = useState(true);
  const [file, setFile] = useState<Blob | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(setRegisterRequiredFields());
    if (!isFormHaveError && file) {
      dispatch(registerAction({ avatar: file})).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(redirectToRoute(AppRoute.Questionary));
        }
      });
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <AvatarInput setFile={setFile} />
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">
              JPG, PNG, оптимальный размер 100×100&nbsp;px
            </span>
          </div>
        </div>
        <div className="sign-up__data">
          <TextInput type={TextInputType.Name} />
          <TextInput type={TextInputType.Email} />
          <DateOfBirthInput />
          <LocationInput />
          <TextInput type={TextInputType.Password} />
          <UserSexInput />
        </div>
        <RoleInput />
        <div className="sign-up__checkbox">
          <label>
            <input
              type="checkbox"
              defaultValue="user-agreement"
              name="user-agreement"
              disabled={isSending}
              checked={isAgree}
              onChange={() => {
                setAgreement(!isAgree);
              }}
            />
            <span className="sign-up__checkbox-icon">
              <svg width={9} height={6} aria-hidden="true">
                <use xlinkHref="#arrow-check" />
              </svg>
            </span>
            <span className="sign-up__checkbox-label">
              Я соглашаюсь с <span>политикой конфиденциальности</span> компании
            </span>
          </label>
        </div>
        <button
          className="btn sign-up__button"
          type="submit"
          disabled={isSending || !isAgree}
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
