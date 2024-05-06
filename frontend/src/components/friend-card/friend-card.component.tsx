import { User, WorkoutRequest } from '../../types';
import { AppRoute, UserRole, UserStatus } from '../../const';
import { getFileUrl } from '../../utils';
import cn from 'classnames';
import Request from './request.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isUserCoach } from '../../store';
import { createWorkoutRequestAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';

type FriendCardProps = {
  user: User;
  workoutRequest?: WorkoutRequest;
};

function FriendCard({ user, workoutRequest }: FriendCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isCoach = useAppSelector(isUserCoach);
  const { id, avatar, name, location, workoutTypes, isReady, role } = user;

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div
          className={cn('thumbnail-friend__info', {
            'thumbnail-friend__info--theme-light': role === UserRole.Default,
            'thumbnail-friend__info--theme-dark': role === UserRole.Coach,
          })}
        >
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={getFileUrl(avatar)} width={78} height={78} />
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <Link to={`${AppRoute.Users}/${id}`}>
              <h2 className="thumbnail-friend__name">{name}</h2>
            </Link>
            <div className="thumbnail-friend__location">
              <svg width={14} height={16} aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">
                {location}
              </address>
            </div>
          </div>
          {workoutTypes.length ? (
            <ul className="thumbnail-friend__training-types-list">
              {workoutTypes.map((workoutType) => (
                <li key={`workout-${workoutType}`}>
                  <div className="hashtag thumbnail-friend__hashtag">
                    <span>#{workoutType}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : undefined}
          <div className="thumbnail-friend__activity-bar">
            <div
              className={cn('thumbnail-friend__ready-status', {
                'thumbnail-friend__ready-status--is-ready': isReady,
                'thumbnail-friend__ready-status--is-not-ready': !isReady,
              })}
            >
              <span>{isReady ? UserStatus.Ready : UserStatus.NotReady}</span>
            </div>
            {!isCoach && isReady ? (
              <button
                className={cn('thumbnail-friend__invite-button', {
                  'thumbnail-friend__invite-button--coach':
                    role === UserRole.Coach,
                })}
                type="button"
                onClick={() => {
                  dispatch(createWorkoutRequestAction(id));
                }}
              >
                <svg
                  width="43"
                  height="46"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use xlinkHref="#icon-invite"></use>
                </svg>
                <span className="visually-hidden">
                  Пригласить друга на совместную тренировку
                </span>
              </button>
            ) : undefined}
          </div>
        </div>
        {workoutRequest ? <Request request={workoutRequest} /> : undefined}
      </div>
    </li>
  );
}

export default FriendCard;
