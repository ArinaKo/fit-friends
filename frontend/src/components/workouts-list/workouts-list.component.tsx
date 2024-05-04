import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getWorkoutsFilterDuration,
  getWorkoutsFilterMaxCalories,
  getWorkoutsFilterMaxPrice,
  getWorkoutsFilterMaxRating,
  getWorkoutsFilterMinCalories,
  getWorkoutsFilterMinPrice,
  getWorkoutsFilterMinRating,
  getWorkoutsList,
  getWorkoutsListPage,
  isWorkoutsListLoading,
} from '../../store';
import { CatalogButtons, UIBlocker, WorkoutCard } from '../index';
import { getCoachWorkoutsAction } from '../../store/api-actions';
import { CatalogButtonsType } from '../catalog-buttons/catalog-buttons';

function WorkoutsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(getWorkoutsList);
  const page = useAppSelector(getWorkoutsListPage);
  const minPriceFilter = useAppSelector(getWorkoutsFilterMinPrice);
  const maxPriceFilter = useAppSelector(getWorkoutsFilterMaxPrice);
  const minCaloriesFilter = useAppSelector(getWorkoutsFilterMinCalories);
  const maxCaloriesFilter = useAppSelector(getWorkoutsFilterMaxCalories);
  const minRatingFilter = useAppSelector(getWorkoutsFilterMinRating);
  const maxRationFilter = useAppSelector(getWorkoutsFilterMaxRating);
  const durationFilter = useAppSelector(getWorkoutsFilterDuration);
  const isDataLoading = useAppSelector(isWorkoutsListLoading);

  useEffect(() => {
    dispatch(getCoachWorkoutsAction());
  }, [
    dispatch,
    page,
    minPriceFilter,
    maxPriceFilter,
    minCaloriesFilter,
    maxCaloriesFilter,
    minRatingFilter,
    maxRationFilter,
    durationFilter,
  ]);

  if (!isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <>
      <ul className="my-trainings__list">
        {workouts.map((workout) => (
          <li className="my-trainings__item" key={`workout-${workout.id}`}>
            <WorkoutCard workout={workout} />
          </li>
        ))}
      </ul>
      <CatalogButtons
        type={CatalogButtonsType.Workouts}
        styleClass="my-trainings__show-more"
      />
    </>
  );
}

export default WorkoutsList;
