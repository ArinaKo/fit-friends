import {
  RadioInput,
  RadioInputType,
  CheckboxInput,
  CheckboxInputType,
  SortingInput,
  SortingInputType,
} from '../form-inputs';

const styleClass = 'user-catalog-form';

function UsersFilter(): JSX.Element {
  return (
    <form className="user-catalog-form__form">
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">
          Локация, станция метро
        </h4>
        <CheckboxInput
          type={CheckboxInputType.UserLocation}
          styleClass={styleClass}
        />
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <CheckboxInput
          type={CheckboxInputType.UserWorkoutTypes}
          styleClass={styleClass}
        />
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <RadioInput type={RadioInputType.UserLevelFilter} />
      </div>
      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">
          Сортировка
        </h3>
        <SortingInput type={SortingInputType.Users} />
      </div>
    </form>
  );
}

export default UsersFilter;
