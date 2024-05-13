import { useNavigate } from 'react-router-dom';
import { CreateWorkoutForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isUserCoach, resetWorkoutForm, setActiveRoute } from '../../store';
import { useEffect } from 'react';
import { AppRoute } from '../../const';

function CreateWorkoutPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCoach = useAppSelector(isUserCoach);

  useEffect(() => {
    if (!isCoach) {
      navigate(AppRoute.Main);
      return;
    }
    dispatch(resetWorkoutForm());
    dispatch(setActiveRoute(AppRoute.CreateWorkout));
  }, [navigate, dispatch, isCoach]);

  return (
    <div className="popup-form popup-form--create-training">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <CreateWorkoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkoutPage;
