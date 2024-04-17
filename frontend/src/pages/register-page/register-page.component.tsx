import { useNavigate } from 'react-router-dom';
import { RegisterForm, UIBlocker } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isAuthRequesting,
  isUserAuth,
  isUserCoach,
  resetUserForm,
} from '../../store';
import { useEffect } from 'react';
import { AppRoute } from '../../const';

function RegisterPage(): JSX.Element {
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

  useEffect(() => {
    dispatch(resetUserForm());
  }, [dispatch]);

  return (
    <div className="popup-form popup-form--sign-up">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Регистрация</h1>
          </div>
          <div className="popup-form__form">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
