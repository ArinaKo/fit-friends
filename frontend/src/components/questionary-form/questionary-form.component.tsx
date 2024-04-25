import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isUserCoach,
  isUserFormDataSending,
  isUserFormHaveErrors,
  setCoachQuestionaryRequiredFields,
  setCustomerQuestionaryRequiredFields,
} from '../../store';
import {
  questionaryCoachAction,
  questionaryCustomerAction,
} from '../../store/api-actions';
import {
  CaloriesInput,
  CaloriesInputType,
  CertificatesInput,
  StatusInput,
  StatusInputMode,
  TextAreaInput,
  TextAreaInputType,
  TimeForWorkoutInput,
  UserLevelInput,
  WorkoutTypesInput,
} from '../form-inputs';

function QuestionaryForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCoach = useAppSelector(isUserCoach);
  const isSending = useAppSelector(isUserFormDataSending);
  const isFormHaveError = useAppSelector(isUserFormHaveErrors);

  const [files, setFiles] = useState<File[]>([]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (isCoach) {
      dispatch(setCoachQuestionaryRequiredFields());
      if (!isFormHaveError) {
        dispatch(questionaryCoachAction({ certificates: files }));
      }
      return;
    }
    dispatch(setCustomerQuestionaryRequiredFields());
    if (!isFormHaveError) {
      dispatch(questionaryCustomerAction());
    }
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
            <WorkoutTypesInput styleClass='questionnaire-user' />
          </div>
          {isCoach ? (
            ''
          ) : (
            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">
                Сколько времени вы готовы уделять на тренировку в день
              </span>
              <TimeForWorkoutInput />
            </div>
          )}
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">Ваш уровень</span>
            <UserLevelInput />
          </div>
          {isCoach ? (
            <>
              <div className="questionnaire-coach__block">
                <span className="questionnaire-coach__legend">
                  Ваши дипломы и сертификаты
                </span>
                <CertificatesInput setFiles={setFiles} />
              </div>
              <div className="questionnaire-coach__block">
                <span className="questionnaire-coach__legend">
                  Расскажите о своём опыте, который мы сможем проверить
                </span>
                <TextAreaInput type={TextAreaInputType.Achievements} />
                <StatusInput mode={StatusInputMode.Questionary} />
              </div>
            </>
          ) : (
            <div className="questionnaire-user__block">
              <div className="questionnaire-user__calories-lose">
                <span className="questionnaire-user__legend">
                  Сколько калорий хотите сбросить
                </span>
                <CaloriesInput type={CaloriesInputType.ToLose} />
              </div>
              <div className="questionnaire-user__calories-waste">
                <span className="questionnaire-user__legend">
                  Сколько калорий тратить в день
                </span>
                <CaloriesInput type={CaloriesInputType.PerDay} />
              </div>
            </div>
          )}
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
