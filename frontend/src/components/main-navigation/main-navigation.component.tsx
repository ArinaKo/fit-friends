import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, isUserCoach } from '../../store';
import { CoachLinks, UserLinks } from './main-navigation';
import { useEffect } from 'react';
import { getUserNotificationsAction } from '../../store/api-actions/notifications-api-actions';
import { NotificationsList } from '../index';
import cn from 'classnames';

function MainNavigation(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCoach = useAppSelector(isUserCoach);
  const activePage = useAppSelector(getCurrentPage);

  useEffect(() => {
    dispatch(getUserNotificationsAction());
  }, [dispatch, activePage]);

  const getMainLinks = () => {
    const list = isCoach ? CoachLinks : UserLinks;
    return list.map((link) => (
      <li className="main-nav__item" key={`link-${link.Icon}`}>
        <Link
          to={link.Route}
          className={cn('main-nav__link', {
            'is-active': activePage === link.Route,
          })}
          aria-label={link.Label}
        >
          <svg
            width={link.IconSize.Width}
            height={link.IconSize.Height}
            aria-hidden="true"
          >
            <use xlinkHref={link.Icon} />
          </svg>
        </Link>
      </li>
    ));
  };

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {getMainLinks()}
        <NotificationsList />
      </ul>
    </nav>
  );
}

export default MainNavigation;
