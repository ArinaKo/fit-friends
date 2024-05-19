import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCatalogPage,
  getUsersFilterLevel,
  getUsersFilterLocations,
  getUsersFilterRole,
  getUsersFilterTypes,
  getUsersList,
  isUsersListLoading,
} from '../../store';
import { CatalogButtons, UIBlocker, UserCard } from '../index';
import {
  getAllUsersAction,
  getUserFriendsAction,
} from '../../store/api-actions';
import { UsersListType, UsersListTypeDiffs } from './users-list';

type UsersListProps = {
  type: UsersListType;
};

function UsersList({ type }: UsersListProps): JSX.Element {
  const { styleClass, cardType } = UsersListTypeDiffs[type];
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersList);
  const page = useAppSelector(getCatalogPage);
  const locationsFilter = useAppSelector(getUsersFilterLocations);
  const typesFilter = useAppSelector(getUsersFilterTypes);
  const levelFilter = useAppSelector(getUsersFilterLevel);
  const roleFilter = useAppSelector(getUsersFilterRole);
  const isDataLoading = useAppSelector(isUsersListLoading);

  useEffect(() => {
    if (type === UsersListType.FriendsList) {
      dispatch(getUserFriendsAction());
      return;
    }
    dispatch(getAllUsersAction());
  }, [
    dispatch,
    type,
    page,
    locationsFilter,
    typesFilter,
    levelFilter,
    roleFilter,
  ]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  if (!users.length) {
    return (
      <p className="empty-list-text">
        Пользователей с выбранными характеристиками не найдено
      </p>
    );
  }

  return (
    <>
      <ul className={`${styleClass}__list`}>
        {users.map((user) => (
          <UserCard
            type={cardType}
            styleClass={styleClass}
            user={user}
            workoutRequest={user.workoutRequest}
            key={`user-${user.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass={`${styleClass}__show-more`} />
    </>
  );
}

export default UsersList;
