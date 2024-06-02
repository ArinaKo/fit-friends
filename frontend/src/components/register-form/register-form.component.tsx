import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isUserFormDataSending,
  isUserFormHaveErrors,
  setRegisterRequiredFields,
} from '../../store';
import { AppRoute } from '../../const';
import { registerAction } from '../../store/api-actions';
import {
  AvatarInput,
  DateOfBirthInput,
  SelectInput,
  RoleInput,
  CustomInput,
  CustomInputType,
  SelectInputType,
  RadioInput,
  RadioInputType,
} from '../form-inputs';
import { useNavigate } from 'react-router-dom';

function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSending = useAppSelector(isUserFormDataSending);
  const isFormHaveError = useAppSelector(isUserFormHaveErrors);
  const [isAgree, setAgreement] = useState(true);
  const [file, setFile] = useState<Blob | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(setRegisterRequiredFields());
    if (!isFormHaveError && file) {
      dispatch(registerAction({ avatar: file })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate(AppRoute.Questionary);
        }
      });
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit} role="form">
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
          <CustomInput type={CustomInputType.Name} />
          <CustomInput type={CustomInputType.Email} />
          <DateOfBirthInput />
          <SelectInput
            type={SelectInputType.Location}
            label="Ваша локация"
            styleClass="sing-up__input"
          />
          <CustomInput type={CustomInputType.Password} />
          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <RadioInput type={RadioInputType.Sex} />
          </div>
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
          data-testid="submitButton"
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
