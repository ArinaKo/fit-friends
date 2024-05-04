function OrdersPage(): JSX.Element {
  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">
          <button
            className="btn-flat btn-flat--underlined my-orders__back"
            type="button"
          >
            <svg width={14} height={10} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </button>
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <div className="sort-for">
              <p>Сортировать по:</p>
              <div className="sort-for__btn-container">
                <button className="btn-filter-sort" type="button">
                  <span>Сумме</span>
                  <svg width={16} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-sort-up" />
                  </svg>
                </button>
                <button className="btn-filter-sort" type="button">
                  <span>Количеству</span>
                  <svg width={16} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-sort-down" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <ul className="my-orders__list">
            <li className="my-orders__item">
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
                  <h2 className="thumbnail-training__title">energy</h2>
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
                  <a
                    className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
                    href="#"
                  >
                    <svg width={18} height={18} aria-hidden="true">
                      <use xlinkHref="#icon-info" />
                    </svg>
                    <span>Подробнее</span>
                  </a>
                </div>
                <div className="thumbnail-training__total-info">
                  <div className="thumbnail-training__total-info-card">
                    <svg width={32} height={32} aria-hidden="true">
                      <use xlinkHref="#icon-chart" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">1</p>
                    <p className="thumbnail-training__total-info-text">
                      Куплено тренировок
                    </p>
                  </div>
                  <div className="thumbnail-training__total-info-card">
                    <svg width={31} height={28} aria-hidden="true">
                      <use xlinkHref="#icon-wallet" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      800<span>₽</span>
                    </p>
                    <p className="thumbnail-training__total-info-text">
                      Общая сумма
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="my-orders__item">
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
                    <span className="thumbnail-training__price-value">
                      1000
                    </span>
                    <span>₽</span>
                  </p>
                  <h2 className="thumbnail-training__title">boxing</h2>
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
                      Тренировка на&nbsp;отработку правильных ударов,
                      координации и&nbsp;оптимальной механики защитных движений.
                    </p>
                  </div>
                  <a
                    className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
                    href="#"
                  >
                    <svg width={18} height={18} aria-hidden="true">
                      <use xlinkHref="#icon-info" />
                    </svg>
                    <span>Подробнее</span>
                  </a>
                </div>
                <div className="thumbnail-training__total-info">
                  <div className="thumbnail-training__total-info-card">
                    <svg width={32} height={32} aria-hidden="true">
                      <use xlinkHref="#icon-chart" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">5</p>
                    <p className="thumbnail-training__total-info-text">
                      Куплено тренировок
                    </p>
                  </div>
                  <div className="thumbnail-training__total-info-card">
                    <svg width={31} height={28} aria-hidden="true">
                      <use xlinkHref="#icon-wallet" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      5 000<span>₽</span>
                    </p>
                    <p className="thumbnail-training__total-info-text">
                      Общая сумма
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="my-orders__item">
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
                    <span className="thumbnail-training__price-value">
                      1400
                    </span>
                    <span>₽</span>
                  </p>
                  <h2 className="thumbnail-training__title">antistress</h2>
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
                      и&nbsp;с&nbsp;психо-эмоциональным состоянием. Уберем
                      зажимы тела, избавимся от стресса.
                    </p>
                  </div>
                  <a
                    className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
                    href="#"
                  >
                    <svg width={18} height={18} aria-hidden="true">
                      <use xlinkHref="#icon-info" />
                    </svg>
                    <span>Подробнее</span>
                  </a>
                </div>
                <div className="thumbnail-training__total-info">
                  <div className="thumbnail-training__total-info-card">
                    <svg width={32} height={32} aria-hidden="true">
                      <use xlinkHref="#icon-chart" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">8</p>
                    <p className="thumbnail-training__total-info-text">
                      Куплено тренировок
                    </p>
                  </div>
                  <div className="thumbnail-training__total-info-card">
                    <svg width={31} height={28} aria-hidden="true">
                      <use xlinkHref="#icon-wallet" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      11 200<span>₽</span>
                    </p>
                    <p className="thumbnail-training__total-info-text">
                      Общая сумма
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="my-orders__item">
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
                    <span className="thumbnail-training__price-value">
                      1200
                    </span>
                    <span>₽</span>
                  </p>
                  <h2 className="thumbnail-training__title">power</h2>
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
                  <a
                    className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
                    href="#"
                  >
                    <svg width={18} height={18} aria-hidden="true">
                      <use xlinkHref="#icon-info" />
                    </svg>
                    <span>Подробнее</span>
                  </a>
                </div>
                <div className="thumbnail-training__total-info">
                  <div className="thumbnail-training__total-info-card">
                    <svg width={32} height={32} aria-hidden="true">
                      <use xlinkHref="#icon-chart" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">12</p>
                    <p className="thumbnail-training__total-info-text">
                      Куплено тренировок
                    </p>
                  </div>
                  <div className="thumbnail-training__total-info-card">
                    <svg width={31} height={28} aria-hidden="true">
                      <use xlinkHref="#icon-wallet" />
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      14 400<span>₽</span>
                    </p>
                    <p className="thumbnail-training__total-info-text">
                      Общая сумма
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="show-more my-orders__show-more">
            <button
              className="btn show-more__button show-more__button--more"
              type="button"
            >
              Показать еще
            </button>
            <button
              className="btn show-more__button show-more__button--to-top"
              type="button"
            >
              Вернуться в начало
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;
