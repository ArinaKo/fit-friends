import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { resetCatalogPage } from '../../../store';
import { CheckboxInputType, CheckboxInputTypeDiffs } from './checkbox-input';
import cn from 'classnames';

const DEFAULT_OPTIONS_COUNT = 5;

type CheckboxInputProps = {
  type: CheckboxInputType;
  styleClass: string;
};

function CheckboxInput({ type, styleClass }: CheckboxInputProps): JSX.Element {
  const {
    name,
    filterSelector,
    isDisabledSelector,
    setFilter,
    optionsArray,
    optionsLabels,
    withButton,
  } = CheckboxInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const filter = useAppSelector(filterSelector);
  const isDisabled = useAppSelector(isDisabledSelector);

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ul
        className={cn(`${styleClass}__check-list`, {
          'filter__check-list': withButton,
          'filter__check-list--open': isOpen,
        })}
      >
        {optionsArray.map((option, index) => (
          <li
            className={`${styleClass}__check-list-item`}
            key={`option-${option}`}
          >
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  name={name}
                  checked={filter.includes(option)}
                  disabled={isDisabled}
                  onChange={() => {
                    dispatch(resetCatalogPage());
                    dispatch(setFilter(option));
                  }}
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">
                  {optionsLabels ? optionsLabels[index] : option}
                </span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      {withButton && optionsArray.length > DEFAULT_OPTIONS_COUNT ? (
        <button
          className={`btn-show-more ${styleClass}__btn-show`}
          type="button"
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          <span>{isOpen ? 'Скрыть' : 'Посмотреть все'}</span>
          {!isOpen ? (
            <svg
              className="btn-show-more__icon"
              width={10}
              height={4}
              aria-hidden="true"
            >
              <use xlinkHref="#arrow-down" />
            </svg>
          ) : undefined}
        </button>
      ) : undefined}
    </>
  );
}

export default CheckboxInput;
