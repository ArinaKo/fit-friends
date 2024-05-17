import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getWorkoutId,
  getWorkoutPrice,
  isUserCoach,
  isWorkoutBalanceActive,
  isWorkoutFormDataSending,
  isWorkoutFormHaveErrors,
  isWorkoutInfoEditing,
  setActivePopup,
  setOrderForm,
  setUpdateWorkoutRequiredFields,
  setWorkoutEditingStatus,
  updateWorkoutAction,
  updateWorkoutVideoAction,
} from '../../store';
import { WorkoutInput, WorkoutInputType } from '../form-inputs';
import { UIBlocker, WorkoutVideo } from '../index';
import Coach from './coach.component';
import Hashtags from './hashtags.component';
import Rating from './rating.component';
import SpecialStatus from './special-status.component';
import cn from 'classnames';
import { PopupKey } from '../../const';

function WorkoutInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCoach = useAppSelector(isUserCoach);
  const workoutId = useAppSelector(getWorkoutId);
  const price = useAppSelector(getWorkoutPrice);
  const isBalanceActive = useAppSelector(isWorkoutBalanceActive);
  const isFormHaveError = useAppSelector(isWorkoutFormHaveErrors);
  const isSending = useAppSelector(isWorkoutFormDataSending);
  const isEdited = useAppSelector(isWorkoutInfoEditing);

  const [file, setFile] = useState<Blob | null>(null);

  const handleUploadFile = () => {
    if (file) {
      dispatch(updateWorkoutVideoAction({ workoutId, video: file })).then(
        () => {
          setFile(null);
        },
      );
    }
  };

  const handleEditButtonClick = (
    evt: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    evt.preventDefault();
    if (!isEdited) {
      dispatch(setWorkoutEditingStatus(true));
      return;
    }
    dispatch(setUpdateWorkoutRequiredFields());
    if (!isFormHaveError) {
      if (file) {
        handleUploadFile();
      }
      dispatch(updateWorkoutAction(workoutId));
    }
  };

  const handleBuyButtonClick = (): void => {
    dispatch(setOrderForm({ workoutId: workoutId, price: Number(price) }));
    dispatch(setActivePopup(PopupKey.Order));
  };

  if (isSending) {
    return <UIBlocker />;
  }

  return (
    <div
      className={cn('training-card', {
        'training-card--edit': isEdited,
      })}
    >
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <Coach />
          {isCoach ? (
            <button
              className={cn(
                'btn-flat btn-flat--light training-info__edit training-info__edit--edit',
                { 'btn-flat--underlined': isEdited },
              )}
              type="button"
              aria-label={isEdited ? 'Сохранить' : 'Редактировать'}
              onClick={handleEditButtonClick}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>{isEdited ? 'Сохранить' : 'Редактировать'}</span>
            </button>
          ) : undefined}
        </div>
        <div className="training-info__main-content">
          <form method="post">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <WorkoutInput
                  type={WorkoutInputType.Title}
                  isActive={isEdited}
                />
                <WorkoutInput
                  type={WorkoutInputType.Description}
                  isActive={isEdited}
                />
              </div>
              <div className="training-info__rating-wrapper">
                <Rating />
                <Hashtags />
              </div>
              <div className="training-info__price-wrapper">
                <WorkoutInput
                  type={WorkoutInputType.Price}
                  isActive={isEdited}
                />
                {isEdited ? <SpecialStatus /> : undefined}
                {isCoach ? undefined : (
                  <button
                    className="btn training-info__buy"
                    type="button"
                    disabled={isBalanceActive}
                    onClick={handleBuyButtonClick}
                  >
                    Купить
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <WorkoutVideo
        newVideo={file}
        setFile={setFile}
        onSave={handleUploadFile}
      />
    </div>
  );
}

export default WorkoutInfo;
