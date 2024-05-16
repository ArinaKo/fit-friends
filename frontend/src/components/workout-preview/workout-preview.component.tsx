import { Link } from 'react-router-dom';
import { AppRoute, STATIC_URL } from '../../const';
import { Workout } from '../../types';

type WorkoutPreviewProps = {
  workout: Workout;
  styleClass: string;
};

function WorkoutPreview({
  workout,
  styleClass,
}: WorkoutPreviewProps): JSX.Element {
  const { id, title, backgroundImage } = workout;

  const link = `${AppRoute.Workouts}/${id}`;

  return (
    <li className={styleClass}>
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img
              src={`${STATIC_URL}/${backgroundImage}`}
              width={452}
              height={191}
              alt="Фотография тренировки"
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              to={link}
              className="btn btn--small thumbnail-preview__button"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default WorkoutPreview;
