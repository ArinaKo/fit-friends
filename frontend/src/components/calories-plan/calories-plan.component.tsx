import { useAppSelector } from '../../hooks';
import { getUserDataCalories } from '../../store';

const DAYS_NUMBER = 7;

function CaloriesPlan(): JSX.Element {
  const calories = useAppSelector(getUserDataCalories);
  return (
    <form action="#" method="get">
      <div className="personal-account-user__form">
        <div className="personal-account-user__input">
          <label>
            <span className="personal-account-user__label">
              План на день, ккал
            </span>
            <input
              type="text"
              name="schedule-for-the-day"
              value={calories}
              disabled
            />
          </label>
        </div>
        <div className="personal-account-user__input">
          <label>
            <span className="personal-account-user__label">
              План на неделю, ккал
            </span>
            <input
              type="text"
              name="schedule-for-the-week"
              value={calories * DAYS_NUMBER}
              disabled
            />
          </label>
        </div>
      </div>
    </form>
  );
}

export default CaloriesPlan;
