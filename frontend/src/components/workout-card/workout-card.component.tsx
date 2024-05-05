import { Link } from 'react-router-dom';
import { Workout } from '../../types';
import { AppRoute, STATIC_URL } from '../../const';
import { WorkoutCardType, WorkoutCardTypeDiffs } from './workout-card';

type OrdersInfo = {
  sum: number;
  count: number;
};

type WorkoutCardProps = {
  workout: Workout;
  type: WorkoutCardType;
  ordersInfo?: OrdersInfo;
};

function OrdersInfo({ count, sum }: OrdersInfo): JSX.Element {
  return (
    <div className="thumbnail-training__total-info">
      <div className="thumbnail-training__total-info-card">
        <svg width={32} height={32} aria-hidden="true">
          <use xlinkHref="#icon-chart" />
        </svg>
        <p className="thumbnail-training__total-info-value">{count}</p>
        <p className="thumbnail-training__total-info-text">
          Куплено тренировок
        </p>
      </div>
      <div className="thumbnail-training__total-info-card">
        <svg width={31} height={28} aria-hidden="true">
          <use xlinkHref="#icon-wallet" />
        </svg>
        <p className="thumbnail-training__total-info-value">
          {sum}
          <span>₽</span>
        </p>
        <p className="thumbnail-training__total-info-text">Общая сумма</p>
      </div>
    </div>
  );
}

function WorkoutCard({
  workout,
  type,
  ordersInfo,
}: WorkoutCardProps): JSX.Element {
  const { listItemStyleClass } = WorkoutCardTypeDiffs[type];
  const {
    id,
    title,
    backgroundImage,
    type: workoutType,
    price,
    calories,
    description,
    rating,
  } = workout;
  return (
    <li className={listItemStyleClass}>
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
                  <span>#{workoutType}</span>
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
        {ordersInfo ? (
          <OrdersInfo count={ordersInfo.count} sum={ordersInfo.sum} />
        ) : undefined}
      </div>
    </li>
  );
}

export default WorkoutCard;
