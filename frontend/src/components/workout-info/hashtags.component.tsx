import { WorkoutSexFor } from '../../const';
import { useAppSelector } from '../../hooks';
import {
  getWorkoutCalories,
  getWorkoutDuration,
  getWorkoutType,
  getWorkoutUserSex,
} from '../../store';

export const WorkoutSexForHashtag = {
  [WorkoutSexFor.Male]: 'для_мужчин',
  [WorkoutSexFor.Female]: 'для_женщин',
  [WorkoutSexFor.All]: 'для_всех',
};

function Hashtags(): JSX.Element {
  const type = useAppSelector(getWorkoutType);
  const userSex = useAppSelector(getWorkoutUserSex);
  const duration = useAppSelector(getWorkoutDuration);
  const calories = useAppSelector(getWorkoutCalories);

  const hashtags = [
    type,
    WorkoutSexForHashtag[userSex as WorkoutSexFor],
    `${calories}ккал`,
    `${duration.replace('-', '_')}минут`,
  ];

  return (
    <ul className="training-info__list">
      {hashtags.map((hashtag) => (
        <li className="training-info__item" key={`hashtag-${hashtag}`}>
          <div className="hashtag hashtag--white">
            <span>#{hashtag}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Hashtags;
