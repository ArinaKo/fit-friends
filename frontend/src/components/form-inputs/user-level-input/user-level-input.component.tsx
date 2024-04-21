import { UserLevel } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormLevel,
  isUserFormDataSending,
  setLevel,
} from '../../../store';
import { ChangeEvent } from 'react';
import lodash from 'lodash';

function UserLevelInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const userLevel = useAppSelector(getUserFormLevel);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
      {Object.values(UserLevel).map((level) => (
        <div className="custom-toggle-radio__block" key={`level-${level}`}>
          <label>
            <input
              type="radio"
              name="level"
              value={level}
              disabled={isDisabled}
              checked={userLevel === level}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                dispatch(setLevel(target.value as UserLevel));
              }}
            />
            <span className="custom-toggle-radio__icon" />
            <span className="custom-toggle-radio__label">
              {lodash.capitalize(level)}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default UserLevelInput;
