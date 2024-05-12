import {
  CheckboxInput,
  CheckboxInputType,
  RangeInput,
  RangeInputType,
} from '../filter-inputs';
import { SortingInput, SortingInputType } from '../index';
import { WorkoutsFilterType, WorkoutsFilterTypeDiffs } from './workouts-filter';

type WorkoutsFilterProps = {
  type: WorkoutsFilterType;
};

function WorkoutsFilter({ type }: WorkoutsFilterProps): JSX.Element {
  const { styleClass } = WorkoutsFilterTypeDiffs[type];
  return (
    <form className={`${styleClass}-form__form`}>
      <div
        className={`${styleClass}-form__block ${styleClass}-form__block--price`}
      >
        <h4 className={`${styleClass}-form__block-title`}>Цена, ₽</h4>
        <RangeInput type={RangeInputType.WorkoutPrice} />
      </div>
      <div
        className={`${styleClass}-form__block ${styleClass}-form__block--calories`}
      >
        <h4 className={`${styleClass}-form__block-title`}>Калории</h4>
        <RangeInput type={RangeInputType.WorkoutCalories} />
      </div>
      <div
        className={`${styleClass}-form__block ${styleClass}-form__block--raiting`}
      >
        <h4 className={`${styleClass}-form__block-title`}>Рейтинг</h4>
        <RangeInput type={RangeInputType.WorkoutRating} />
      </div>
      {type === WorkoutsFilterType.CoachWorkouts ? (
        <div
          className={`${styleClass}-form__block ${styleClass}-form__block--duration`}
        >
          <h4 className={`${styleClass}-form__block-title`}>Длительность</h4>
          <CheckboxInput
            type={CheckboxInputType.DurationOfWorkout}
            styleClass={`${styleClass}-form`}
          />
        </div>
      ) : (
        <>
          <div
            className={`${styleClass}-form__block ${styleClass}-form__block--type`}
          >
            <h4 className={`${styleClass}-form__block-title`}>Тип</h4>
            <CheckboxInput
              type={CheckboxInputType.TypeOfWorkout}
              styleClass={`${styleClass}-form`}
            />
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
              Сортировка
            </h4>
            <SortingInput type={SortingInputType.Workouts} styleClass='gym-catalog-form' />
          </div>
        </>
      )}
    </form>
  );
}

export default WorkoutsFilter;
