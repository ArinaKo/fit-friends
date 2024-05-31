import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCatalogPage,
  getWorkoutsFilterDuration,
  getWorkoutsFilterMaxCalories,
  getWorkoutsFilterMaxPrice,
  getWorkoutsFilterMaxRating,
  getWorkoutsFilterMinCalories,
  getWorkoutsFilterMinPrice,
  getWorkoutsFilterMinRating,
  getWorkoutsFilterTypes,
  getWorkoutsList,
  getWorkoutsSortingType,
  isWorkoutsListLoading,
} from '../../store';
import { CatalogButtons, UIBlocker, WorkoutCard } from '../index';
import {
  getAllWorkoutsAction,
  getCoachWorkoutsAction,
} from '../../store/api-actions';
import { WorkoutsListType, WorkoutsListTypeDiffs } from './workouts-list';

type WorkoutsListProps = {
  type: WorkoutsListType;
};

function WorkoutsList({ type }: WorkoutsListProps): JSX.Element {
  const { styleClass, cardStyleClass } = WorkoutsListTypeDiffs[type];
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(getWorkoutsList);
  const page = useAppSelector(getCatalogPage);
  const minPriceFilter = useAppSelector(getWorkoutsFilterMinPrice);
  const maxPriceFilter = useAppSelector(getWorkoutsFilterMaxPrice);
  const minCaloriesFilter = useAppSelector(getWorkoutsFilterMinCalories);
  const maxCaloriesFilter = useAppSelector(getWorkoutsFilterMaxCalories);
  const minRatingFilter = useAppSelector(getWorkoutsFilterMinRating);
  const maxRationFilter = useAppSelector(getWorkoutsFilterMaxRating);
  const durationFilter = useAppSelector(getWorkoutsFilterDuration);
  const typesFilter = useAppSelector(getWorkoutsFilterTypes);
  const sorting = useAppSelector(getWorkoutsSortingType);
  const isDataLoading = useAppSelector(isWorkoutsListLoading);

  useEffect(() => {
    if (type === WorkoutsListType.CoachWorkouts) {
      dispatch(getCoachWorkoutsAction());
      return;
    }
    dispatch(getAllWorkoutsAction());
  }, [
    dispatch,
    type,
    page,
    minPriceFilter,
    maxPriceFilter,
    minCaloriesFilter,
    maxCaloriesFilter,
    minRatingFilter,
    maxRationFilter,
    durationFilter,
    typesFilter,
    sorting,
  ]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  if (!workouts.length) {
    return (
      <p className="empty-list-text">
        Тренировок с выбранными характеристиками не найдено
      </p>
    );
  }

  return (
    <>
      <ul className={`${styleClass}__list`} data-testid="workoutsList">
        {workouts.map((workout) => (
          <WorkoutCard
            styleClass={cardStyleClass}
            workout={workout}
            key={`workout-${workout.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass={`${styleClass}__show-more`} />
    </>
  );
}

export default WorkoutsList;
