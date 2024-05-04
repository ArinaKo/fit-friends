import {
  CheckboxInput,
  CheckboxInputType,
  RangeInput,
  RangeInputType,
} from '../filter-inputs';

function WorkoutsFilter(): JSX.Element {
  return (
    <form className="my-training-form__form">
      <div className="my-training-form__block my-training-form__block--price">
        <h4 className="my-training-form__block-title">Цена, ₽</h4>
        <RangeInput type={RangeInputType.WorkoutPrice} />
      </div>
      <div className="my-training-form__block my-training-form__block--calories">
        <h4 className="my-training-form__block-title">Калории</h4>
        <RangeInput type={RangeInputType.WorkoutCalories} />
      </div>
      <div className="my-training-form__block my-training-form__block--raiting">
        <h4 className="my-training-form__block-title">Рейтинг</h4>
        <RangeInput type={RangeInputType.WorkoutRating} />
      </div>
      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <CheckboxInput
          type={CheckboxInputType.DurationOfWorkout}
          styleClass="my-training-form"
        />
      </div>
    </form>
  );
}

export default WorkoutsFilter;
