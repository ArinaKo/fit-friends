import { Link } from 'react-router-dom';
import { Workout } from '../../types';
import { AppRoute, STATIC_URL } from '../../const';

type WorkoutCardProps = {
  workout: Workout;
};

function WorkoutCard({ workout }: WorkoutCardProps): JSX.Element {
  const {
    id,
    title,
    backgroundImage,
    type,
    price,
    calories,
    description,
    rating,
  } = workout;
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img
              src={`${STATIC_URL}/${backgroundImage}`}
              width={330}
              height={190}
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          {price !== 0 ? (
            <>
              <span className="thumbnail-training__price-value">{price}</span>
              <span>₽</span>
            </>
          ) : (
            'Бесплатно'
          )}
        </p>
        <h3 className="thumbnail-training__title">{title}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{type}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{calories}ккал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <span className="thumbnail-training__rate-value">{rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link
            to={`${AppRoute.Workouts}/${id}`}
            className="btn btn--small thumbnail-training__button-catalog"
          >
            Подробнее
          </Link>
          <a
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            href="#"
          >
            Отзывы
          </a>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;
