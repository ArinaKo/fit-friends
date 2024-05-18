import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getUserDescription,
  getUserIsReady,
  getUserLocation,
  getUserName,
  getUserWorkoutTypes,
  isUserRoleCoach,
  isUserAFriend,
  getUserImages,
  getUserLevel,
  removeUserFromFriendsAction,
  getUserId,
  addUserToFriendsAction,
  isUserCoach,
  setActivePopup,
} from '../../store';
import cn from 'classnames';
import { getFileUrl } from '../../utils';
import { PopupKey } from '../../const';
import { Popup, CoachCertificates } from '../index';

function UserInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);
  const name = useAppSelector(getUserName);
  const isCoach = useAppSelector(isUserCoach);
  const location = useAppSelector(getUserLocation);
  const isRoleCoach = useAppSelector(isUserRoleCoach);
  const isReady = useAppSelector(getUserIsReady);
  const description = useAppSelector(getUserDescription);
  const workoutTypes = useAppSelector(getUserWorkoutTypes);
  const level = useAppSelector(getUserLevel);
  const isFriend = useAppSelector(isUserAFriend);
  const images = useAppSelector(getUserImages);

  const hashtags = [...workoutTypes, level];

  const handleFriendButtonClick = () => {
    if (isFriend) {
      dispatch(removeUserFromFriendsAction(userId));
      return;
    }
    dispatch(addUserToFriendsAction(userId));
  };

  return (
    <div className="user-card__wrapper">
      <div className="user-card__content">
        <div className="user-card__head">
          <h2 className="user-card__title">{name}</h2>
        </div>
        <div className="user-card__label">
          <a href="">
            <svg
              className="user-card__icon-location"
              width={12}
              height={14}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location" />
            </svg>
            <span>{location}</span>
          </a>
        </div>
        <div className="user-card__status-container">
          {isRoleCoach ? (
            <div className="user-card__role">
              <svg
                className="user-card__role-icon"
                width={12}
                height={13}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-cup" />
              </svg>
              <span>Тренер</span>
            </div>
          ) : undefined}
          <div
            className={cn('user-card__status', {
              'user-card__status--active': isReady,
            })}
          >
            <span>
              {`${isReady ? 'Готов' : 'Не готов'} ${
                isRoleCoach ? 'тренировать' : 'к тренировке'
              }`}
            </span>
          </div>
        </div>
        <div className="user-card__text">
          <p>{description}</p>
        </div>
        {isRoleCoach ? (
          <button
            className="btn-flat user-card__sertificate"
            type="button"
            onClick={() => {
              dispatch(setActivePopup(PopupKey.Certificates));
            }}
          >
            <svg width={12} height={13} aria-hidden="true">
              <use xlinkHref="#icon-teacher" />
            </svg>
            <span>Посмотреть сертификаты</span>
          </button>
        ) : undefined}
        <ul className="user-card__hashtag-list">
          {hashtags.map((hashtag) => (
            <li className="user-card__hashtag-item" key={`hashtag-${hashtag}`}>
              <div className="hashtag">
                <span>#{hashtag}</span>
              </div>
            </li>
          ))}
        </ul>
        <button
          className={cn('btn user-card__btn', { 'btn--outlined': isFriend })}
          type="button"
          disabled={isCoach && !isFriend}
          onClick={handleFriendButtonClick}
        >
          {isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}
        </button>
      </div>
      <div className="user-card__gallery">
        <ul className="user-card__gallery-list">
          {images.map((image) => (
            <li className="user-card__gallery-item" key={`image-${image.id}`}>
              <img
                src={getFileUrl(image)}
                width={334}
                height={573}
                alt={image.originalName}
              />
            </li>
          ))}
        </ul>
      </div>
      <Popup type={PopupKey.Certificates} title="Сертификаты">
        <CoachCertificates />
      </Popup>
    </div>
  );
}

export default UserInfo;
