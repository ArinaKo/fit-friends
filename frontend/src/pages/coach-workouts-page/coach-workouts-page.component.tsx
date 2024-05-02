import { WorkoutsFilter, WorkoutsList } from '../../components';

function CoachWorkoutsPage(): JSX.Element {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <div className="my-training-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="my-training-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-training-form__btnback"
                type="button"
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </button>
              <h3 className="my-training-form__title">фильтры</h3>
              <WorkoutsFilter />
            </div>
          </div>
          <div className="inner-page__content">
            <div className="my-trainings">
              <WorkoutsList />
              <div className="show-more my-trainings__show-more">
                <button
                  className="btn show-more__button show-more__button--more"
                  type="button"
                >
                  Показать еще
                </button>
                <button
                  className="btn show-more__button show-more__button--to-top"
                  type="button"
                >
                  Вернуться в начало
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoachWorkoutsPage;
