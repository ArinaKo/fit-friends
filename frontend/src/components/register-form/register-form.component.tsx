import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getUserFormDateOfBirth,
  getUserFormEmail,
  getUserFormLocation,
  getUserFormName,
  getUserFormPassword,
  getUserFormRole,
  getUserFormSex,
  isUserFormDataSending,
  setDateOfBirth,
  setEmail,
  setLocation,
  setName,
  setPassword,
  setRole,
  setSex,
} from '../../store';
import {
  AppRoute,
  MetroStation,
  RoleInputLabel,
  UserRole,
  UserSex,
} from '../../const';
import { registerAction } from '../../store/api-actions';
import lodash from 'lodash';
import dayjs from 'dayjs';
import { redirectToRoute } from '../../store/actions';

function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(isUserFormDataSending);
  const email = useAppSelector(getUserFormEmail);
  const password = useAppSelector(getUserFormPassword);
  const name = useAppSelector(getUserFormName);
  const dateOfBirth = useAppSelector(getUserFormDateOfBirth);
  const userSex = useAppSelector(getUserFormSex);
  const userRole = useAppSelector(getUserFormRole);
  const location = useAppSelector(getUserFormLocation);

  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(
      registerAction({
        email,
        password,
        name,
        sex: userSex,
        role: userRole,
        location: location,
        dateOfBirth: dateOfBirth.length ? new Date(dateOfBirth) : undefined,
        avatar: '6614adb311a9567c1b1a513e',
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(redirectToRoute(AppRoute.Questionary));
      }
    });
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <div className="input-load-avatar">
            <label>
              <input
                className="visually-hidden"
                type="file"
                accept="image/png, image/jpeg"
              />
              <span className="input-load-avatar__btn">
                <svg width={20} height={20} aria-hidden="true">
                  <use xlinkHref="#icon-import" />
                </svg>
              </span>
            </label>
          </div>
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">
              JPG, PNG, оптимальный размер 100×100&nbsp;px
            </span>
          </div>
        </div>
        <div className="sign-up__data">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  value={name}
                  disabled={isSending}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                    dispatch(setName(target.value));
                  }}
                />
              </span>
            </label>
          </div>
          <div className="custom-input">
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
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Дата рождения</span>
              <span className="custom-input__wrapper">
                <input
                  type="date"
                  name="birthday"
                  max="2099-12-31"
                  value={
                    dateOfBirth
                      ? String(dayjs(dateOfBirth).format('YYYY-MM-DD'))
                      : ''
                  }
                  disabled={isSending}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                    dispatch(setDateOfBirth(target.value));
                  }}
                />
              </span>
            </label>
          </div>
          <div
            className={`custom-select ${
              location ? '' : 'custom-select--not-selected'
            } ${isOpen ? 'is-open' : ''}`}
          >
            <span className="custom-select__label">Ваша локация</span>
            {location ? (
              <div className="custom-select__placeholder">
                ст. м. {location}
              </div>
            ) : (
              ''
            )}
            <button
              className="custom-select__button"
              type="button"
              aria-label="Выберите одну из опций"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="custom-select__text" />
              <span className="custom-select__icon">
                <svg width={15} height={6} aria-hidden="true">
                  <use xlinkHref="#arrow-down" />
                </svg>
              </span>
            </button>
            <ul className="custom-select__list" role="listbox">
              {Object.values(MetroStation).map((station) => (
                <li
                  key={`metro-${station}`}
                  onClick={() => {
                    dispatch(setLocation(station));
                    setIsOpen(false);
                  }}
                  className="custom-select__item"
                >
                  {station}
                </li>
              ))}
            </ul>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Пароль</span>
              <span className="custom-input__wrapper">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  disabled={isSending}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                    dispatch(setPassword(target.value));
                  }}
                />
              </span>
            </label>
          </div>
          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              {Object.values(UserSex).map((sex) => (
                <div className="custom-toggle-radio__block" key={`sex-${sex}`}>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value={sex}
                      disabled={isSending}
                      checked={sex === userSex}
                      onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                        dispatch(setSex(target.value as UserSex));
                      }}
                    />
                    <span className="custom-toggle-radio__icon" />
                    <span className="custom-toggle-radio__label">
                      {lodash.capitalize(sex)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sign-up__role">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            {Object.values(UserRole).map((role) => (
              <div className="role-btn" key={`role-${role}`}>
                <label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    name="role"
                    value={role}
                    disabled={isSending}
                    checked={role === userRole}
                    onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                      dispatch(setRole(target.value as UserRole));
                    }}
                  />
                  <span className="role-btn__icon">
                    <svg width={12} height={13} aria-hidden="true">
                      <use xlinkHref="#icon-cup" />
                    </svg>
                  </span>
                  <span className="role-btn__btn">{RoleInputLabel[role]}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input
              type="checkbox"
              defaultValue="user-agreement"
              name="user-agreement"
              // disabled={isSending}
              // onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              //   target.checked = !target.checked;
              // }}
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
          disabled={isSending}
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
