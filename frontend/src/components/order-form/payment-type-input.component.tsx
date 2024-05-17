import { PaymentType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getOrderPaymentType,
  isOrderSending,
  setPaymentType,
} from '../../store';
import { PaymentTypeItem } from './payment-type-input';

function PaymentTypeInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const paymentType = useAppSelector(getOrderPaymentType);
  const isDisabled = useAppSelector(isOrderSending);

  return (
    <ul className="payment-method__list">
      {Object.values(PaymentType).map((value) => {
        const { icon, label, iconHeight, iconWidth } = PaymentTypeItem[value];
        return (
          <li className="payment-method__item" key={`payment-${value}`}>
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name="payment-purchases"
                  aria-label={label}
                  disabled={isDisabled}
                  checked={value === paymentType}
                  onChange={() => {
                    dispatch(setPaymentType(value));
                  }}
                />
                <span className="btn-radio-image__image">
                  <svg width={iconWidth} height={iconHeight} aria-hidden="true">
                    <use xlinkHref={icon} />
                  </svg>
                </span>
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PaymentTypeInput;
