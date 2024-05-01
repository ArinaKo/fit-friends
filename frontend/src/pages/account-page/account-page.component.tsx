import { Link } from 'react-router-dom';
import {
  CaloriesPlan,
  CoachCertificates,
  EditUserForm,
  NewFeatureFiller,
  UIBlocker,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isUserCoach, isUserDataReady, isUserDataUpdating } from '../../store';
import { useEffect } from 'react';
import { getAuthUserAction } from '../../store/api-actions';
import { AppRoute } from '../../const';

function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCoach = useAppSelector(isUserCoach);
  const isDataReady = useAppSelector(isUserDataReady);
  const isDataUpdating = useAppSelector(isUserDataUpdating);

  useEffect(() => {
    if (!isDataReady) {
      dispatch(getAuthUserAction());
    }
  }, [dispatch, isDataReady]);

  if (!isDataReady || isDataUpdating) {
    return <UIBlocker />;
  }

  return (
    <>
      <h1 className="visually-hidden">Личный кабинет</h1>
      <EditUserForm />
      <div className="inner-page__content">
        <div className={`personal-account-${isCoach ? 'coach' : 'user'}`}>
          {isCoach ? (
            <div className="personal-account-coach__navigation">
              <Link
                    to={AppRoute.CoachWorkouts}
                className="thumbnail-link thumbnail-link--theme-light"
              >
                <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                  <svg width={30} height={26} aria-hidden="true">
                    <use xlinkHref="#icon-flash" />
                  </svg>
                </div>
                <span className="thumbnail-link__text">Мои тренировки</span>
              </Link>
              <Link
                    to={AppRoute.CreateWorkout}
                className="thumbnail-link thumbnail-link--theme-light"
              >
                <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                  <svg width={30} height={26} aria-hidden="true">
                    <use xlinkHref="#icon-add" />
                  </svg>
                </div>
                    <span className="thumbnail-link__text">
                      Создать тренировку
                    </span>
              </Link>
              <Link
                    to={AppRoute.Friends}
                className="thumbnail-link thumbnail-link--theme-light"
              >
                <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                  <svg width={30} height={26} aria-hidden="true">
                    <use xlinkHref="#icon-friends" />
                  </svg>
                </div>
                <span className="thumbnail-link__text">Мои друзья</span>
              </Link>
              <Link
                    to={AppRoute.Orders}
                className="thumbnail-link thumbnail-link--theme-light"
              >
                <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                  <svg width={30} height={26} aria-hidden="true">
                    <use xlinkHref="#icon-bag" />
                  </svg>
                </div>
                <span className="thumbnail-link__text">Мои заказы</span>
              </Link>
              <div className="personal-account-coach__calendar">
                <NewFeatureFiller />
              </div>
            </div>
          ) : (
            <div className="personal-account-user__schedule">
              <CaloriesPlan />
            </div>
          )}
          <div
            className={`personal-account-${
              isCoach ? 'coach' : 'user'
            }__additional-info`}
          >
            {isCoach ? (
              <CoachCertificates />
            ) : (
              <>
                <Link
                      to={AppRoute.Friends}
                  className="thumbnail-link thumbnail-link--theme-light"
                >
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width={30} height={26} aria-hidden="true">
                      <use xlinkHref="#icon-friends" />
                    </svg>
                  </div>
                  <span className="thumbnail-link__text">Мои друзья</span>
                </Link>
                <Link
                      to={AppRoute.Balance}
                  className="thumbnail-link thumbnail-link--theme-light"
                >
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width={30} height={26} aria-hidden="true">
                      <use xlinkHref="#icon-shopping-cart" />
                    </svg>
                  </div>
                  <span className="thumbnail-link__text">Мои покупки</span>
                </Link>
                <NewFeatureFiller />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
