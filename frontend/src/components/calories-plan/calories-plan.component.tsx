function CaloriesPlan(): JSX.Element {
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
              defaultValue="3 300"
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
              defaultValue="23 100"
            />
          </label>
        </div>
      </div>
    </form>
  );
}

export default CaloriesPlan;
