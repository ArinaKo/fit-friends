import { useAppDispatch, useAppSelector } from '../../../hooks';
import { isUserFormDataSending, setUserFormError } from '../../../store';
import { ChangeEvent } from 'react';
import { validateName } from '../../../utils';
import cn from 'classnames';
import { TextInputType, TextInputTypeDiffs } from './text-input';

type TextInputProps = {
  type: TextInputType;
};

function TextInput({ type }: TextInputProps): JSX.Element {
  const {
    valueSelector,
    errorSelector,
    validationFunction,
    setValue,
    errorFieldName,
    fieldType,
  } = TextInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn('custom-input sign-in__input', {
        'custom-input--error': valueError,
      })}
    >
      <label>
        <span className="custom-input__label">Имя</span>
        <span className="custom-input__wrapper">
          <input
            type={fieldType ? fieldType : 'text'}
            name="name"
            value={value}
            disabled={isDisabled}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              dispatch(setValue(target.value));
              if (validateName(target.value) !== valueError) {
                dispatch(
                  setUserFormError([
                    errorFieldName,
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
