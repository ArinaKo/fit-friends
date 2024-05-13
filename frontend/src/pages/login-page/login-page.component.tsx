import { useNavigate } from 'react-router-dom';
import { LoginForm, UIBlocker } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isAuthRequesting,
  isUserAuth,
  isUserCoach,
  resetUserForm,
} from '../../store';
import { useEffect } from 'react';
import { AppRoute } from '../../const';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(isUserAuth);
  const isCoach = useAppSelector(isUserCoach);
  const isDataLoading = useAppSelector(isAuthRequesting);

  useEffect(() => {
    if (isAuth) {
      navigate(isCoach ? AppRoute.Account : AppRoute.Main);
    }
    dispatch(resetUserForm());
  }, [navigate, dispatch, isAuth, isCoach]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <div className="popup-form popup-form--sign-in">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Вход</h1>
          </div>
          <div className="popup-form__form">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
