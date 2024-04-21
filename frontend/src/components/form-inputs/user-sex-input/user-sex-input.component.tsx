import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUserFormSex, isUserFormDataSending, setSex } from '../../../store';
import { UserSex } from '../../../const';
import { ChangeEvent } from 'react';
import lodash from 'lodash';

function UserSexInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const userSex = useAppSelector(getUserFormSex);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div className="sign-up__radio">
      <span className="sign-up__label">Пол</span>
      <div className="custom-toggle-radio custom-toggle-radio--big">
        {Object.values(UserSex).map((sex) => (
          <div className="custom-toggle-radio__block" key={`sex-${sex}`}>
            <label>
              <input
                type="radio"
                name="sex"
                value={sex}
                disabled={isDisabled}
                checked={sex === userSex}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                  dispatch(setSex(target.value as UserSex));
                }}
              />
              <span className="custom-toggle-radio__icon" />
              <span className="custom-toggle-radio__label">
                {lodash.capitalize(sex)}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSexInput;
