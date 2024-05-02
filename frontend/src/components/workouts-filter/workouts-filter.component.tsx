function WorkoutsFilter(): JSX.Element {
  return (
    <form className="my-training-form__form">
      <div className="my-training-form__block my-training-form__block--price">
        <h4 className="my-training-form__block-title">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="text-min"
              name="text-min"
              defaultValue={0}
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="text-max"
              name="text-max"
              defaultValue={3200}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <div className="filter-range">
          <div className="filter-range__scale">
            <div className="filter-range__bar">
              <span className="visually-hidden">Полоса прокрутки</span>
            </div>
          </div>
          <div className="filter-range__control">
            <button className="filter-range__min-toggle">
              <span className="visually-hidden">Минимальное значение</span>
            </button>
            <button className="filter-range__max-toggle">
              <span className="visually-hidden">Максимальное значение</span>
            </button>
          </div>
        </div>
      </div>
      <div className="my-training-form__block my-training-form__block--calories">
        <h4 className="my-training-form__block-title">Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input type="number" id="text-min-cal" name="text-min-cal" />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input type="number" id="text-max-cal" name="text-max-cal" />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <div className="filter-range">
          <div className="filter-range__scale">
            <div className="filter-range__bar">
              <span className="visually-hidden">Полоса прокрутки</span>
            </div>
          </div>
          <div className="filter-range__control">
            <button className="filter-range__min-toggle">
              <span className="visually-hidden">Минимальное значение</span>
            </button>
            <button className="filter-range__max-toggle">
              <span className="visually-hidden">Максимальное значение</span>
            </button>
          </div>
        </div>
      </div>
      <div className="my-training-form__block my-training-form__block--raiting">
        <h4 className="my-training-form__block-title">Рейтинг</h4>
        <div className="filter-raiting">
          <div className="filter-raiting__scale">
            <div className="filter-raiting__bar">
              <span className="visually-hidden">Полоса прокрутки</span>
            </div>
          </div>
          <div className="filter-raiting__control">
            <button className="filter-raiting__min-toggle">
              <span className="visually-hidden">Минимальное значение</span>
            </button>
            <span>0</span>
            <button className="filter-raiting__max-toggle">
              <span className="visually-hidden">Максимальное значение</span>
            </button>
            <span>5</span>
          </div>
        </div>
      </div>
      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <ul className="my-training-form__check-list">
          <li className="my-training-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultValue="duration-1"
                  name="duration"
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">10 мин - 30 мин</span>
              </label>
            </div>
          </li>
          <li className="my-training-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultValue="duration-1"
                  name="duration"
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">30 мин - 50 мин</span>
              </label>
            </div>
          </li>
          <li className="my-training-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultValue="duration-1"
                  name="duration"
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">50 мин - 80 мин</span>
              </label>
            </div>
          </li>
          <li className="my-training-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultValue="duration-1"
                  name="duration"
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">80 мин - 100 мин</span>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </form>
  );
}

export default WorkoutsFilter;
