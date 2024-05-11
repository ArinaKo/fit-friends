import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCatalogPage, getUsersList, isUsersListLoading } from '../../store';
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
  const isDataLoading = useAppSelector(isUsersListLoading);

  useEffect(() => {
    if (type === UsersListType.FriendsList) {
      dispatch(getUserFriendsAction());
      return;
    }
    dispatch(getAllUsersAction());
  }, [dispatch, type, page]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <>
      <ul className={`${styleClass}__list`}>
        {users.map((user) => (
          <UserCard type={cardType} user={user} key={`user-${user.id}`} />
        ))}
      </ul>
      <CatalogButtons styleClass={`${styleClass}__show-more`} />
    </>
  );
}

export default UsersList;
