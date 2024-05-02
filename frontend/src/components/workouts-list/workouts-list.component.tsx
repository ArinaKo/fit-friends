function WorkoutsList(): JSX.Element {
  return (
    <ul className="my-trainings__list">
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-02.webp, img/content/thumbnails/training-02@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-02.jpg"
                  srcSet="img/content/thumbnails/training-02@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">Бесплатно</p>
            <h3 className="thumbnail-training__title">crossfit</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#кроссфит</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#1200ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Сложный комплекс упражнений для профессиональных атлетов
                на&nbsp;отработку показателей в&nbsp;классическом стиле.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-01.jpg"
                  srcSet="img/content/thumbnails/training-01@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">800</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">energy</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#пилатес</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#320ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">4</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Упражнения укрепляют мышечный корсет, делают суставы более
                гибкими, улучшают осанку и&nbsp;координацию.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-03.webp, img/content/thumbnails/training-03@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-03.jpg"
                  srcSet="img/content/thumbnails/training-03@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1000</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">boxing</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#бокс</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#800ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Тренировка на&nbsp;отработку правильных ударов, координации
                и&nbsp;оптимальной механики защитных движений.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-04.webp, img/content/thumbnails/training-04@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-04.jpg"
                  srcSet="img/content/thumbnails/training-04@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1200</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">power</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#силовые</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#600ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">4</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Тренировка на&nbsp;отработку правильной техники работы
                с&nbsp;тяжелыми весами, укрепления мышц кора и&nbsp;спины.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-05.webp, img/content/thumbnails/training-05@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-05.jpg"
                  srcSet="img/content/thumbnails/training-05@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1400</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">antistress</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#йога</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#250ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                В&nbsp;основе программы лежит работа с&nbsp;телом
                и&nbsp;с&nbsp;психо-эмоциональным состоянием. Уберем зажимы
                тела, избавимся от стресса.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-06.jpg"
                  srcSet="img/content/thumbnails/training-06@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1600</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">run, forrest, run</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#бег</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#500ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Узнайте правильную технику бега, развивайте выносливость
                и&nbsp;откройте для себя все секреты длительных пробежек.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-07.webp, img/content/thumbnails/training-07@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-07.jpg"
                  srcSet="img/content/thumbnails/training-07@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1600</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">fitball</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#пилатес</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#200ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Тренировка на&nbsp;фитболе&nbsp;— отличном тренажере для
                развития чувства баланса и&nbsp;равновесия, улучшения
                координации.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-08.webp, img/content/thumbnails/training-08@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-08.jpg"
                  srcSet="img/content/thumbnails/training-08@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1800</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">hatha</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#йога</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#350ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">4</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Упражнения по&nbsp;хатха йоге, направленные на&nbsp;понижение
                нервной возбудимости и&nbsp;активацию процессов анаболизма.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-09.webp, img/content/thumbnails/training-09@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-09.jpg"
                  srcSet="img/content/thumbnails/training-09@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">1800</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">full body stretch</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#стретчинг</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#400ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Комплекс упражнений на&nbsp;растяжку всего тела для новичков.
                Плавное погружение в&nbsp;стретчинг и&nbsp;умеренная нагрузка.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-10.webp, img/content/thumbnails/training-10@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-10.jpg"
                  srcSet="img/content/thumbnails/training-10@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">2000</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">upper body</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#силовые</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#800ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">4</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Проработка мышц груди для профи, экспериментируем с&nbsp;уровнем
                наклона скамьи и&nbsp;различной шириной хвата.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-11.webp, img/content/thumbnails/training-11@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-11.jpg"
                  srcSet="img/content/thumbnails/training-11@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">2200</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">devil&apos;s cindy</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#кроссфит</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#950ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">5</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Знаменитый кроссфит комплекс. Синди&nbsp;— универсальная
                тренировка для развития функциональной силы.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="my-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/training-12.webp, img/content/thumbnails/training-12@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/training-12.jpg"
                  srcSet="img/content/thumbnails/training-12@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">2400</span>
              <span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">fleksbend</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#аэробика</span>
                  </div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>#450ккал</span>
                  </div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <span className="thumbnail-training__rate-value">4</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">
                Тренируясь с&nbsp;резинкой для фитнеса, вы можете проработать
                почти все мышечные группы и&nbsp;разнообразить тренировки.
              </p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <a
                className="btn btn--small thumbnail-training__button-catalog"
                href="#"
              >
                Подробнее
              </a>
              <a
                className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                href="#"
              >
                Отзывы
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default WorkoutsList;
