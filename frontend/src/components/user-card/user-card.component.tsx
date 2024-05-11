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
  workoutRequest?: WorkoutRequest;
};

function UserCard({ type, user, workoutRequest }: UserCardProps): JSX.Element {
  const { id, isReady, role } = user;

  const userLink = `${AppRoute.Users}/${id}`;

  return type === UserCardType.Default ? (
    <li className="users-catalog__item">
      <div
        className={cn('thumbnail-user', {
          'thumbnail-user--role-user': role === UserRole.Default,
          'thumbnail-user--role-coach': role === UserRole.Coach,
        })}
      >
        <UserCardInner type={type} user={user} />
        <Link to={userLink} className="btn btn--medium thumbnail-user__button">
          Подробнее
        </Link>
      </div>
    </li>
  ) : (
    <li className="friends-list__item">
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
    </li>
  );
}

export default UserCard;
