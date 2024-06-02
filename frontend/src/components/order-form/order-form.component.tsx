import { STATIC_URL } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  createOrderAction,
  getOrderSum,
  getWorkoutImage,
  getWorkoutPrice,
  getWorkoutTitle,
  isOrderSending,
} from '../../store';
import CountInput from './count-input.component';
import PaymentTypeInput from './payment-type-input.component';

function TotalSum(): JSX.Element {
  const sum = useAppSelector(getOrderSum);
  return <p className="popup__total-price">{sum}&nbsp;₽</p>;
}

function OrderForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const image = useAppSelector(getWorkoutImage);
  const title = useAppSelector(getWorkoutTitle);
  const price = useAppSelector(getWorkoutPrice);
  const isDisabled = useAppSelector(isOrderSending);

  const handleBuyButtonClick = (
    evt: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    evt.preventDefault();
    dispatch(createOrderAction());
  };

  return (
    <div className="popup__content popup__content--purchases">
      <div className="popup__product">
        <div className="popup__product-image">
          <picture>
            <img
              src={`${STATIC_URL}/${image}`}
              width={98}
              height={80}
              alt="Фотография тренировки"
            />
          </picture>
        </div>
        <div className="popup__product-info">
          <h3 className="popup__product-title">{title}</h3>
          <p className="popup__product-price">{price} ₽</p>
        </div>
        <div className="popup__product-quantity">
          <p className="popup__quantity">Количество</p>
          <CountInput />
        </div>
      </div>
      <section className="payment-method">
        <h4 className="payment-method__title">Выберите способ оплаты</h4>
        <PaymentTypeInput />
      </section>
      <div className="popup__total">
        <p className="popup__total-text">Итого</p>
        <svg
          className="popup__total-dash"
          width={310}
          height={2}
          aria-hidden="true"
        >
          <use xlinkHref="#dash-line" />
        </svg>
        <TotalSum />
      </div>
      <div className="popup__button">
        <button
          className="btn"
          type="button"
          disabled={isDisabled}
          onClick={handleBuyButtonClick}
          data-testid="submitButton"
        >
          Купить
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
