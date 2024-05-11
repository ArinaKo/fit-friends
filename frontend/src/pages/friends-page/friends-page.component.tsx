import { useNavigate } from 'react-router-dom';
import { UsersList, UsersListType } from '../../components';
import { useAppDispatch } from '../../hooks';
import { AppRoute, ListItemsPortion } from '../../const';
import { useEffect } from 'react';
import { resetCatalogData } from '../../store';

function FriendsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetCatalogData(ListItemsPortion.Friends));
  }, [dispatch]);

  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">
          <button
            className="btn-flat friends-list__back"
            type="button"
            onClick={() => navigate(AppRoute.Account)}
          >
            <svg width={14} height={10} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </button>
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          <UsersList type={UsersListType.FriendsList} />
        </div>
      </div>
    </section>
  );
}

export default FriendsPage;
