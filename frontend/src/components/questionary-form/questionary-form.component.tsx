import { FormEvent } from 'react';
import { /*useAppDispatch, */ useAppSelector } from '../../hooks';
import {
  isUserFormDataSending,
  // isUserFormHaveErrors,
  // setQuestionaryRequiredFields,
} from '../../store';

function QuestionaryForm(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const isCoach = useAppSelector(isUserCoach);
  const isSending = useAppSelector(isUserFormDataSending);
  // const isFormHaveError = useAppSelector(isUserFormHaveErrors);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    // dispatch(setQuestionaryRequiredFields());
    // if (!isFormHaveError) {
    //   dispatch(updateUserAction());
    // }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="questionnaire-user">
        <h1 className="visually-hidden">Опросник</h1>
        <div className="questionnaire-user__wrapper">
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">
              Ваша специализация (тип) тренировок
            </span>
            <div className="specialization-checkbox questionnaire-user__specializations">
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="yoga"
                  />
                  <span className="btn-checkbox__btn">Йога</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="running"
                  />
                  <span className="btn-checkbox__btn">Бег</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="power"
                  />
                  <span className="btn-checkbox__btn">Силовые</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="aerobics"
                  />
                  <span className="btn-checkbox__btn">Аэробика</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="crossfit"
                  />
                  <span className="btn-checkbox__btn">Кроссфит</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="boxing"
                  />
                  <span className="btn-checkbox__btn">Бокс</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="pilates"
                  />
                  <span className="btn-checkbox__btn">Пилатес</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    defaultValue="stretching"
                  />
                  <span className="btn-checkbox__btn">Стрейчинг</span>
                </label>
              </div>
            </div>
          </div>
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">
              Сколько времени вы готовы уделять на тренировку в день
            </span>
            <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">10-30 мин</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">30-50 мин</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">50-80 мин</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">80-100 мин</span>
                </label>
              </div>
            </div>
          </div>
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">Ваш уровень</span>
            <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="level" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">Новичок</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="level" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">Любитель</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="level" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">
                    Профессионал
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="questionnaire-user__block">
            <div className="questionnaire-user__calories-lose">
              <span className="questionnaire-user__legend">
                Сколько калорий хотите сбросить
              </span>
              <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                <label>
                  <span className="custom-input__wrapper">
                    <input type="number" name="calories-lose" />
                    <span className="custom-input__text">ккал</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="questionnaire-user__calories-waste">
              <span className="questionnaire-user__legend">
                Сколько калорий тратить в день
              </span>
              <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                <label>
                  <span className="custom-input__wrapper">
                    <input type="number" name="calories-waste" />
                    <span className="custom-input__text">ккал</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn questionnaire-user__button"
          type="submit"
          disabled={isSending}
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default QuestionaryForm;
