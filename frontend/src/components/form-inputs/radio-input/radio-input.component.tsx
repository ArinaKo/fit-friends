import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RadioInputType, RadioInputTypeDiffs } from './radio-input';
import lodash from 'lodash';
import cn from 'classnames';

type RadioInputProps = {
  type: RadioInputType;
  styleClass?: string;
};

function RadioInput({ type, styleClass }: RadioInputProps): JSX.Element {
  const {
    valueSelector,
    setValue,
    optionsArray,
    optionsLabels,
    formStatusSelector,
    fieldName,
    styleMode,
  } = RadioInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const isDisabled = useAppSelector(formStatusSelector);

  return (
    <div
      className={cn('custom-toggle-radio', {
        [`${styleClass ?? ''}__radio`]: styleClass,
        styleMode,
      })}
    >
      {Object.values(optionsArray).map((option, index) => (
        <div className="custom-toggle-radio__block" key={`option-${option}`}>
          <label>
            <input
              type="radio"
              name={fieldName}
              value={value}
              disabled={isDisabled}
              checked={value === option}
              onChange={() => {
                dispatch(setValue(option));
              }}
            />
            <span className="custom-toggle-radio__icon" />
            <span className="custom-toggle-radio__label">
              {optionsLabels ? optionsLabels[index] : lodash.capitalize(option)}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioInput;
