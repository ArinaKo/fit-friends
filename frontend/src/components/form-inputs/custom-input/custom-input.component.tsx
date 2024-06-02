import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ChangeEvent, useEffect } from 'react';
import { CustomInputType, CustomInputTypeDiffs } from './custom-input';
import cn from 'classnames';

type CustomInputProps = {
  type: CustomInputType;
  styleClass?: string;
  originalValue?: string;
  isActive?: boolean;
};

function CustomInput({
  type,
  styleClass,
  originalValue,
  isActive = true,
}: CustomInputProps): JSX.Element {
  const {
    valueSelector,
    errorSelector,
    validationFunction,
    formStatusSelector,
    setError,
    setValue,
    fieldName,
    fieldType,
    labelText,
    styleMode,
    inputSymbol,
  } = CustomInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(formStatusSelector);

  useEffect(() => {
    if (originalValue && isActive) {
      dispatch(setValue(originalValue));
    }
  }, [dispatch, setValue, isActive, originalValue]);

  return (
    <div
      className={cn('custom-input', {
        'custom-input--error': valueError,
        'custom-input--readonly': !isActive,
        [`${styleClass ?? ''}__input`]: styleClass,
        [`${styleMode ?? ''}`]: styleMode,
      })}
    >
      <label>
        {labelText ? (
          <span className="custom-input__label">{labelText}</span>
        ) : undefined}
        <span className="custom-input__wrapper">
          <input
            type={fieldType ? fieldType : 'text'}
            name={fieldName}
            autoComplete="off"
            value={isActive ? value : originalValue}
            disabled={isDisabled || !isActive}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setValue(target.value));
              if (validationFunction(target.value) !== valueError) {
                dispatch(setError(validationFunction(target.value)));
              }
            }}
            data-testid="customInput"
          />
          {inputSymbol ? (
            <span className="custom-input__text">{inputSymbol}</span>
          ) : undefined}
        </span>
        {valueError && (
          <span className="custom-input__error">{valueError}</span>
        )}
      </label>
    </div>
  );
}

export default CustomInput;
