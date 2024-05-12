import { useNavigate } from 'react-router-dom';
import { UsersFilter, UsersList, UsersListType } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import {
  getUserDataLevel,
  isUserCoach,
  resetCatalogData,
  resetUsersFilters,
  setUsersLevelFilter,
} from '../../store';
import { AppRoute, ListItemsPortion } from '../../const';

function UsersCatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLevel = useAppSelector(getUserDataLevel);
  const isCoach = useAppSelector(isUserCoach);

  useEffect(() => {
    if (isCoach) {
      navigate(AppRoute.Account);
      return;
    }
    dispatch(resetCatalogData(ListItemsPortion.AllUsers));
    dispatch(resetUsersFilters());
    dispatch(setUsersLevelFilter(userLevel));
  }, [navigate, dispatch, isCoach, userLevel]);

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>
          <div className="user-catalog-form">
            <h2 className="visually-hidden">Каталог пользователя</h2>
            <div className="user-catalog-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                type="button"
                onClick={() => navigate(AppRoute.Account)}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </button>
              <h3 className="user-catalog-form__title">Фильтры</h3>
              <UsersFilter />
            </div>
          </div>
          <div className="inner-page__content">
            <div className="users-catalog">
              <UsersList type={UsersListType.UsersCatalog} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsersCatalogPage;
