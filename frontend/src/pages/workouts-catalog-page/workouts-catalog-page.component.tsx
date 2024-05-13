import { useNavigate } from 'react-router-dom';
import {
  WorkoutsFilter,
  WorkoutsFilterType,
  WorkoutsList,
  WorkoutsListType,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isUserCoach,
  resetCatalogData,
  resetWorkoutsFilters,
  setActiveRoute,
} from '../../store';
import { useEffect } from 'react';
import { AppRoute, ListItemsPortion } from '../../const';

function WorkoutsCatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCoach = useAppSelector(isUserCoach);

  useEffect(() => {
    if (isCoach) {
      navigate(AppRoute.Account);
      return;
    }
    dispatch(resetCatalogData(ListItemsPortion.AllWorkouts));
    dispatch(resetWorkoutsFilters());
    dispatch(setActiveRoute(AppRoute.Workouts));
  }, [navigate, dispatch, isCoach]);

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <div className="gym-catalog-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="gym-catalog-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                type="button"
                onClick={() => navigate(AppRoute.Account)}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </button>
              <h3 className="gym-catalog-form__title">Фильтры</h3>
              <WorkoutsFilter type={WorkoutsFilterType.WorkoutsCatalog} />
            </div>
          </div>
          <div className="training-catalog">
            <WorkoutsList type={WorkoutsListType.WorkoutsCatalog} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkoutsCatalogPage;
