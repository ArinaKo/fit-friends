import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect, useState } from 'react';
import { SelectInputType, SelectInputTypeDiffs } from './select-input';
import cn from 'classnames';

type SelectInputProps = {
  type: SelectInputType;
  styleClass?: string;
  label?: string;
  originalValue?: string;
  isActive?: boolean;
};

function SelectInput({
  type,
  label,
  styleClass,
  originalValue,
  isActive = true,
}: SelectInputProps): JSX.Element {
  const {
    valueSelector,
    setValue,
    optionsArray,
    labelFunction,
    errorSelector,
    setError,
    formStatusSelector,
    labelText,
  } = SelectInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(formStatusSelector);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (originalValue && isActive) {
      dispatch(setValue(originalValue));
    }
  }, [dispatch, setValue, isActive, originalValue]);

  const getPlaceholder = () => {
    const text = !isActive ? originalValue : value;
    return text ? (
      <div className="custom-select__placeholder">{labelFunction(text)}</div>
    ) : undefined;
  };

  return (
    <div
      className={cn('custom-select', {
        [`${styleClass ?? ''}__input`]: styleClass,
        'custom-select--not-selected': isActive && !value,
        'custom-select--readonly': !isActive,
        'is-invalid': valueError,
        'is-open': isOpen,
      })}
    >
      <span className="custom-select__label">{label ?? labelText}</span>
      {getPlaceholder()}
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        disabled={isDisabled || !isActive}
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
        {optionsArray.map((option) => (
          <li
            key={`option-${option}`}
            onClick={() => {
              dispatch(setValue(option));
              dispatch(setError(undefined));
              setIsOpen(false);
            }}
            className="custom-select__item"
            data-testid="selectValue"
          >
            {labelFunction(option)}
          </li>
        ))}
      </ul>
      {valueError && !isOpen && (
        <span className="custom-select__error">{valueError}</span>
      )}
    </div>
  );
}

export default SelectInput;
