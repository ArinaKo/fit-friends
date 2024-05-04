import { useEffect } from 'react';
import { ListItemsPortion } from '../../const';
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
  getWorkoutsListLimit,
  increaseWorkoutsLimit,
  isWorkoutsListLoading,
} from '../../store';
import { CatalogButtons, UIBlocker, WorkoutCard } from '../index';
import { getCoachWorkoutsAction } from '../../store/api-actions';

function WorkoutsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(getWorkoutsList);
  const limit = useAppSelector(getWorkoutsListLimit);
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
    limit,
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

  function handleShoeMoreButtonClick(evt: React.MouseEvent) {
    evt.preventDefault();
    dispatch(increaseWorkoutsLimit(ListItemsPortion.CoachWorkouts));
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
        styleClass="my-trainings__show-more"
        onShowMoreButtonClick={handleShoeMoreButtonClick}
      />
    </>
  );
}

export default WorkoutsList;
