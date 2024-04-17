import { useNavigate } from 'react-router-dom';
import { LoginForm, UIBlocker } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isAuthRequesting,
  isUserAuth,
  isUserCoach,
} from '../../store';
import { useEffect } from 'react';
import { AppRoute } from '../../const';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(isUserAuth);
  const isCoach = useAppSelector(isUserCoach);
  const isDataLoading = useAppSelector(isAuthRequesting);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  useEffect(() => {
    if (isAuth) {
      isCoach ? navigate(AppRoute.Account) : navigate(AppRoute.Main);
    }
  }, [dispatch, isAuth]);

  return (
    <div className="popup-form popup-form--sign-in">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Вход</h1>
          </div>
          <div className="popup-form__form">
            <form method="get">
              <div className="sign-in">
                <div className="custom-input sign-in__input">
                  <label>
                    <span className="custom-input__label">E-mail</span>
                    <span className="custom-input__wrapper">
                      <input type="email" name="email" />
                    </span>
                  </label>
                </div>
                <div className="custom-input sign-in__input">
                  <label>
                    <span className="custom-input__label">Пароль</span>
                    <span className="custom-input__wrapper">
                      <input type="password" name="password" />
                    </span>
                  </label>
                </div>
                <button className="btn sign-in__button" type="submit">
                  Продолжить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
