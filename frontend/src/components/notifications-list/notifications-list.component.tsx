import { useAppSelector } from '../../hooks';
import { getNotifications } from '../../store';
import NotificationCard from './notification-card.component';
import cn from 'classnames';

function NotificationsList(): JSX.Element {
  const notifications = useAppSelector(getNotifications);

  return (
    <li
      className={cn('main-nav__item main-nav__item--notifications', {
        'is-notifications': notifications.length !== 0,
      })}
      data-testid="notificationsContainer"
    >
      <button className="main-nav__link" aria-label="Уведомления">
        <svg width={14} height={18} aria-hidden="true">
          <use xlinkHref="#icon-notification" />
        </svg>
      </button>
      {notifications.length ? (
        <div className="main-nav__dropdown">
          <p className="main-nav__label">Оповещения</p>
          <ul className="main-nav__sublist">
            {notifications.map((notification) => (
              <NotificationCard
                notification={notification}
                key={`notification-${notification.id}`}
              />
            ))}
          </ul>
        </div>
      ) : undefined}
    </li>
  );
}

export default NotificationsList;
