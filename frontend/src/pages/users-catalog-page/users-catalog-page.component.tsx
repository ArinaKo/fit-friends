import { useNavigate } from 'react-router-dom';
import { UsersList, UsersListType } from '../../components';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { resetCatalogData } from '../../store';
import { AppRoute, ListItemsPortion } from '../../const';

function UsersCatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetCatalogData(ListItemsPortion.AllUsers));
  }, [dispatch]);

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
              <form className="user-catalog-form__form">
                <div className="user-catalog-form__block user-catalog-form__block--location">
                  <h4 className="user-catalog-form__block-title">
                    Локация, станция метро
                  </h4>
                  <ul className="user-catalog-form__check-list">
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="user-agreement-1"
                            name="user-agreement"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Автово</span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="user-agreement-1"
                            name="user-agreement"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Адмиралтейская
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="user-agreement-1"
                            name="user-agreement"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Академическая
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="user-agreement-1"
                            name="user-agreement"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Балтийская
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="user-agreement-1"
                            name="user-agreement"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Бухарестская
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                  <button
                    className="btn-show-more user-catalog-form__btn-show"
                    type="button"
                  >
                    <span>Посмотреть все</span>
                    <svg
                      className="btn-show-more__icon"
                      width={10}
                      height={4}
                      aria-hidden="true"
                    >
                      <use xlinkHref="#arrow-down" />
                    </svg>
                  </button>
                </div>
                <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                  <h4 className="user-catalog-form__block-title">
                    Специализация
                  </h4>
                  <ul className="user-catalog-form__check-list">
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="spezialization-1"
                            name="spezialization"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Аэробика</span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="spezialization-1"
                            name="spezialization"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Бег</span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="spezialization-1"
                            name="spezialization"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Бокс</span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="spezialization-1"
                            name="spezialization"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Йога</span>
                        </label>
                      </div>
                    </li>
                    <li className="user-catalog-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            defaultValue="spezialization-1"
                            name="spezialization"
                          />
                          <span className="custom-toggle__icon">
                            <svg width={9} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-check" />
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Кроссфит</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                  <button
                    className="btn-show-more user-catalog-form__btn-show"
                    type="button"
                  >
                    <span>Посмотреть все</span>
                    <svg
                      className="btn-show-more__icon"
                      width={10}
                      height={4}
                      aria-hidden="true"
                    >
                      <use xlinkHref="#arrow-down" />
                    </svg>
                  </button>
                </div>
                <div className="user-catalog-form__block user-catalog-form__block--level">
                  <h4 className="user-catalog-form__block-title">
                    Ваш уровень
                  </h4>
                  <div className="custom-toggle-radio">
                    <div className="custom-toggle-radio__block">
                      <label>
                        <input type="radio" name="user-agreement" />
                        <span className="custom-toggle-radio__icon" />
                        <span className="custom-toggle-radio__label">
                          Новичок
                        </span>
                      </label>
                    </div>
                    <div className="custom-toggle-radio__block">
                      <label>
                        <input type="radio" name="user-agreement" />
                        <span className="custom-toggle-radio__icon" />
                        <span className="custom-toggle-radio__label">
                          Любитель
                        </span>
                      </label>
                    </div>
                    <div className="custom-toggle-radio__block">
                      <label>
                        <input
                          type="radio"
                          name="user-agreement"
                          defaultValue="user-agreement-1"
                        />
                        <span className="custom-toggle-radio__icon" />
                        <span className="custom-toggle-radio__label">
                          Профессионал
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="user-catalog-form__block">
                  <h3 className="user-catalog-form__title user-catalog-form__title--sort">
                    Сортировка
                  </h3>
                  <div className="btn-radio-sort">
                    <label>
                      <input type="radio" name="sort" />
                      <span className="btn-radio-sort__label">Тренеры</span>
                    </label>
                    <label>
                      <input type="radio" name="sort" />
                      <span className="btn-radio-sort__label">
                        Пользователи
                      </span>
                    </label>
                  </div>
                </div>
              </form>
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
