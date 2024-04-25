import { useAppDispatch, useAppSelector } from '../../../hooks';
import { isUserFormDataSending, setUserFormError } from '../../../store';
import { ChangeEvent, useEffect } from 'react';
import { validateName } from '../../../utils';
import cn from 'classnames';
import { TextInputType, TextInputTypeDiffs } from './text-input';

type TextInputProps = {
  type: TextInputType;
  styleClass?: string;
  originalValue?: string;
  isActive?: boolean;
};

function TextInput({
  type,
  styleClass,
  originalValue,
  isActive = true,
}: TextInputProps): JSX.Element {
  const {
    valueSelector,
    errorSelector,
    validationFunction,
    setValue,
    fieldName,
    fieldType,
    labelText
  } = TextInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(isUserFormDataSending);

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
      })}
    >
      <label>
        <span className="custom-input__label">{labelText}</span>
        <span className="custom-input__wrapper">
          <input
            type={fieldType ? fieldType : 'text'}
            name={fieldName}
            value={isActive ? value : originalValue}
            disabled={isDisabled || !isActive}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setValue(target.value));
              if (validateName(target.value) !== valueError) {
                dispatch(
                  setUserFormError([
                    fieldName,
                    validationFunction(target.value),
                  ]),
                );
              }
            }}
          />
        </span>
        {valueError && (
          <span className="custom-input__error">{valueError}</span>
        )}
      </label>
    </div>
  );
}

export default TextInput;
