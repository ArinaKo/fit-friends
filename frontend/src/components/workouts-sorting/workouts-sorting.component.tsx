import { WorkoutsSortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getWorkoutsSortingType,
  isWorkoutsListLoading,
  resetCatalogPage,
  setWorkoutsSorting,
} from '../../store';

const SortingText = {
  [WorkoutsSortType.PriceUp]: 'Дешевле',
  [WorkoutsSortType.PriceDown]: 'Дороже',
  [WorkoutsSortType.Free]: 'Бесплатные',
};

function WorkoutsSorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getWorkoutsSortingType);
  const isDisabled = useAppSelector(isWorkoutsListLoading);

  return (
    <div className="btn-radio-sort gym-catalog-form__radio">
      {Object.values(WorkoutsSortType).map((type) => (
        <label key={`sorting-${type}`}>
          <input
            type="checkbox"
            name="sort"
            disabled={isDisabled}
            checked={type === sortType}
            value={type}
            onChange={() => {
              dispatch(resetCatalogPage());
              dispatch(setWorkoutsSorting(type));
            }}
          />
          <span className="btn-radio-sort__label">{SortingText[type]}</span>
        </label>
      ))}
    </div>
  );
}

export default WorkoutsSorting;
