import { useNavigate } from 'react-router-dom';
import { QuestionaryForm, UIBlocker } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isAuthRequesting, isUserAuth, resetUserForm } from '../../store';
import { useEffect } from 'react';
import { AppRoute } from '../../const';

function QuestionaryPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(isUserAuth);
  const isDataLoading = useAppSelector(isAuthRequesting);

  useEffect(() => {
    if (!isAuth) {
      navigate(AppRoute.Login);
    }
  }, [navigate, isAuth]);

  useEffect(() => {
    dispatch(resetUserForm());
  }, [dispatch]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <QuestionaryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionaryPage;
