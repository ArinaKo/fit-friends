import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isWorkoutFormDataSending,
  isWorkoutFormHaveErrors,
  setCreationRequiredFields,
} from '../../store';
import {
  SelectInput,
  SelectInputType,
  CustomInput,
  CustomInputType,
  RadioInput,
  RadioInputType,
  TextAreaInput,
  TextAreaInputType,
  WorkoutVideoInput,
} from '../form-inputs';
import { createWorkoutAction } from '../../store/api-actions';

const styleClass = 'create-training';

function CreateWorkoutForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(isWorkoutFormDataSending);
  const isFormHaveError = useAppSelector(isWorkoutFormHaveErrors);
  const [file, setFile] = useState<Blob | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(setCreationRequiredFields());
    if (!isFormHaveError && file) {
      dispatch(createWorkoutAction(file));
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="create-training">
        <div className="create-training__wrapper">
          <div className="create-training__block">
            <h2 className="create-training__legend">Название тренировки</h2>
            <CustomInput
              type={CustomInputType.WorkoutTitle}
              styleClass={styleClass}
            />
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">
              Характеристики тренировки
            </h2>
            <div className="create-training__info">
              <SelectInput type={SelectInputType.TypeOfWorkout} />
              <CustomInput type={CustomInputType.WorkoutCalories} />
              <SelectInput type={SelectInputType.DurationOfWorkout} />
              <CustomInput type={CustomInputType.WorkoutPrice} />
              <SelectInput type={SelectInputType.LevelOfWorkout} />
              <div className="create-training__radio-wrapper">
                <span className="create-training__label">
                  Кому подойдет тренировка
                </span>
                <br />
                <RadioInput
                  type={RadioInputType.UserSexFor}
                  styleClass={styleClass}
                />
              </div>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Описание тренировки</h2>
            <TextAreaInput type={TextAreaInputType.WorkoutDescription} />
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">
              Загрузите видео-тренировку
            </h2>
            <WorkoutVideoInput setFile={setFile} styleClass='create-training__drag-and-drop'/>
          </div>
        </div>
        <button
          className="btn create-training__button"
          type="submit"
          disabled={isSending}
          data-testid="submitButton"
        >
          Опубликовать
        </button>
      </div>
    </form>
  );
}

export default CreateWorkoutForm;
