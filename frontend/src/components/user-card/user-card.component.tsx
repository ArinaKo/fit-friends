import { User, WorkoutRequest } from '../../types';
import { AppRoute, UserRole } from '../../const';
import { Link } from 'react-router-dom';
import { UserCardType } from './user-card';
import Request from './request.component';
import ActivityBar from './activity-bar.component';
import cn from 'classnames';
import UserCardInner from './user-card-inner.component';

type UserCardProps = {
  type: UserCardType;
  user: User;
  styleClass: string;
  workoutRequest?: WorkoutRequest;
  isDark?: boolean;
};

function UserCard({
  type,
  user,
  styleClass,
  workoutRequest,
  isDark = false,
}: UserCardProps): JSX.Element {
  const { id, isReady, role } = user;

  const userLink = `${AppRoute.Users}/${id}`;

  return (
    <li className={`${styleClass}__item`}>
      {type === UserCardType.Default ? (
        <div
          className={cn('thumbnail-user', {
            'thumbnail-user--role-user': role === UserRole.Default,
            'thumbnail-user--role-coach': role === UserRole.Coach,
            'thumbnail-user--dark': isDark,
          })}
        >
          <UserCardInner type={type} user={user} />
          <Link
            to={userLink}
            className="btn btn--medium thumbnail-user__button"
          >
            Подробнее
          </Link>
        </div>
      ) : (
        <div className="thumbnail-friend">
          <div
            className={cn('thumbnail-friend__info', {
              'thumbnail-friend__info--theme-light': role === UserRole.Default,
              'thumbnail-friend__info--theme-dark': role === UserRole.Coach,
            })}
          >
            <UserCardInner type={type} user={user} />
            <ActivityBar userId={id} userRole={role} isReady={isReady} />
          </div>
          {workoutRequest ? <Request request={workoutRequest} /> : undefined}
        </div>
      )}
    </li>
  );
}

export default UserCard;
