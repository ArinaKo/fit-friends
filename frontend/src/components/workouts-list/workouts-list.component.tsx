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
import {
  CatalogButtons,
  UIBlocker,
  WorkoutCard,
  WorkoutCardType,
} from '../index';
import {
  getAllWorkoutsAction,
  getCoachWorkoutsAction,
} from '../../store/api-actions';
import { WorkoutsListType, WorkoutsListTypeDiffs } from './workouts-list';

type WorkoutsListProps = {
  type: WorkoutsListType;
};

function WorkoutsList({ type }: WorkoutsListProps): JSX.Element {
  const { listStyleClass } = WorkoutsListTypeDiffs[type];
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
    dispatch(
      type === WorkoutsListType.CoachWorkouts
        ? getCoachWorkoutsAction()
        : getAllWorkoutsAction(),
    );
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

  return (
    <>
      <ul className={`${listStyleClass}__list`}>
        {workouts.map((workout) => (
          <WorkoutCard
            type={WorkoutCardType.CoachWorkouts}
            workout={workout}
            key={`workout-${workout.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass={`${listStyleClass}__show-more`} />
    </>
  );
}

export default WorkoutsList;
