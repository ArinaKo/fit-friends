import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getWorkoutCoach } from '../../store';
import { getFileUrl } from '../../utils';
import { AppRoute } from '../../const';

function Coach(): JSX.Element {
  const coach = useAppSelector(getWorkoutCoach);

  return (
    <div className="training-info__coach">
      <div className="training-info__photo">
        <picture>
          <img
            src={coach ? getFileUrl(coach.avatar) : ''}
            width={64}
            height={64}
            alt="Изображение тренера"
          />
        </picture>
      </div>
      <div className="training-info__coach-info">
        <span className="training-info__label">Тренер</span>
        <Link to={`${AppRoute.Users}/${coach ? coach.id : ''}`}>
          <span className="training-info__name">{coach ? coach.name : ''}</span>
        </Link>
      </div>
    </div>
  );
}

export default Coach;
