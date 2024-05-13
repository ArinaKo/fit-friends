import { useAppDispatch } from '../../hooks';
import { deleteNotificationAction } from '../../store';
import { Notification } from '../../types';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

const DATA_FORMAT = 'D MMMM, h:mm';
const MonthsFormats = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  months: MonthsFormats,
});

type NotificationCardProps = {
  notification: Notification;
};

function NotificationCard({
  notification,
}: NotificationCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id, text, date } = notification;

  const handleNotificationClick = () => {
    dispatch(deleteNotificationAction(id));
  };

  return (
    <li className="main-nav__subitem">
      <a
        className="notification is-active"
        type="button"
        onClick={handleNotificationClick}
      >
        <p className="notification__text">{text}</p>
        <time className="notification__time" dateTime={date.toString()}>
          {dayjs(date).format(DATA_FORMAT)}
        </time>
      </a>
    </li>
  );
}

export default NotificationCard;
