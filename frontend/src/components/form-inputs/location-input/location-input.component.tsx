import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormLocation,
  getUserFormLocationError,
  isUserFormDataSending,
  setLocation,
  setUserFormError,
} from '../../../store';
import { useState } from 'react';
import cn from 'classnames';
import { MetroStation } from '../../../const';

function LocationInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useAppSelector(getUserFormLocation);
  const locationError = useAppSelector(getUserFormLocationError);
  const isDisabled = useAppSelector(isUserFormDataSending);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={cn('custom-select sign-in__input', {
        'custom-select--not-selected': location,
        'is-invalid': locationError,
        'is-open': isOpen,
      })}
    >
      <span className="custom-select__label">Ваша локация</span>
      {location ? (
        <div className="custom-select__placeholder">ст. м. {location}</div>
      ) : (
        ''
      )}
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        disabled={isDisabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select__text" />
        <span className="custom-select__icon">
          <svg width={15} height={6} aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {Object.values(MetroStation).map((station) => (
          <li
            key={`metro-${station}`}
            onClick={() => {
              dispatch(setLocation(station));
              dispatch(setUserFormError(['location', undefined]));
              setIsOpen(false);
            }}
            className="custom-select__item"
          >
            {station}
          </li>
        ))}
      </ul>
      {locationError && !isOpen && (
        <span className="custom-select__error">{locationError}</span>
      )}
    </div>
  );
}

export default LocationInput;
