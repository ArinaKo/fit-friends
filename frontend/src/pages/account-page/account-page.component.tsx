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
import { CoachLinks, CustomerLinks } from './account-page';

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

  const getAccountLinks = () => {
    const list = isCoach ? CoachLinks : CustomerLinks;
    return list.map((link) => (
      <Link
        key={`link-${link.Icon}`}
        to={link.Route}
        className="thumbnail-link thumbnail-link--theme-light"
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width={30} height={26} aria-hidden="true">
            <use xlinkHref={link.Icon} />
          </svg>
        </div>
        <span className="thumbnail-link__text">{link.Label}</span>
      </Link>
    ));
  };

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <EditUserForm />
          <div className="inner-page__content">
            <div className={`personal-account-${isCoach ? 'coach' : 'user'}`}>
              {isCoach ? (
                <div className="personal-account-coach__navigation">
                  {getAccountLinks()}
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
                    {getAccountLinks()}
                    <NewFeatureFiller />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountPage;
