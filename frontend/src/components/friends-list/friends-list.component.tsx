import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCatalogPage,
  getFriendsList,
  isFriendsListLoading,
} from '../../store';
import { CatalogButtons, UIBlocker, FriendCard } from '../index';
import { getUserFriendsAction } from '../../store/api-actions';

function FriendsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriendsList);
  const page = useAppSelector(getCatalogPage);
  const isDataLoading = useAppSelector(isFriendsListLoading);

  useEffect(() => {
    dispatch(getUserFriendsAction());
  }, [dispatch, page]);

  if (!isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <>
      <ul className="friends-list__list">
        {friends.map(({user, workoutRequest}) => (
          <FriendCard
            user={user}
            workoutRequest={workoutRequest}
            key={`user-${user.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass="friends-list__show-more" />
    </>
  );
}

export default FriendsList;
