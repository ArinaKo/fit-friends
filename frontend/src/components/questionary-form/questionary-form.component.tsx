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
  CustomInput,
  CustomInputType,
  CertificatesInput,
  StatusInput,
  StatusInputMode,
  TextAreaInput,
  TextAreaInputType,
  WorkoutTypesInput,
  RadioInput,
  RadioInputType,
} from '../form-inputs';

const styleClass = 'questionnaire-user';

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
            <WorkoutTypesInput styleClass={styleClass} />
          </div>
          {isCoach ? (
            ''
          ) : (
            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">
                Сколько времени вы готовы уделять на тренировку в день
              </span>
              <RadioInput
                type={RadioInputType.TimeForWorkout}
                styleClass={styleClass}
              />
            </div>
          )}
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">Ваш уровень</span>
            <RadioInput type={RadioInputType.Level} styleClass={styleClass} />
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
                <CustomInput
                  type={CustomInputType.CaloriesToLose}
                  styleClass={styleClass}
                />
              </div>
              <div className="questionnaire-user__calories-waste">
                <span className="questionnaire-user__legend">
                  Сколько калорий тратить в день
                </span>
                <CustomInput
                  type={CustomInputType.CaloriesPerDay}
                  styleClass={styleClass}
                />
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
