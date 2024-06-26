import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { UIBlocker, UserInfo, UserInfoWorkouts } from '../../components';
import {
  getUserAction,
  getUserId,
  isUserInfoHasError,
  isUserLoading,
  isUserRoleCoach,
  setActiveRoute,
} from '../../store';
import { AppRoute } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page.component';

function UserPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUserId = useAppSelector(getUserId);
  const isUserCoach = useAppSelector(isUserRoleCoach);
  const isDataLoading = useAppSelector(isUserLoading);
  const hasError = useAppSelector(isUserInfoHasError);

  useEffect(() => {
    if (currentUserId !== userId && !isDataLoading) {
      dispatch(getUserAction(userId as string));
    }
    dispatch(setActiveRoute());
  }, [dispatch, userId, currentUserId, isDataLoading]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  if (hasError) {
    return <NotFoundPage />;
  }

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">
          <button
            className="btn-flat inner-page__back"
            type="button"
            onClick={() => navigate(AppRoute.Users)}
          >
            <svg width={14} height={10} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </button>
          <div className="inner-page__content">
            <section className="user-card">
              <h1 className="visually-hidden">Карточка пользователя</h1>
              {isUserCoach ? (
                <div className="user-card__container">
                  <UserInfo />
                  <UserInfoWorkouts />
                </div>
              ) : (
                <UserInfo />
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
