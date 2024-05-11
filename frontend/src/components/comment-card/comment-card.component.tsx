import { Comment } from '../../types';
import { AppRoute } from '../../const';
import { getFileUrl } from '../../utils';
import { Link } from 'react-router-dom';

type CommentCardProps = {
  comment: Comment;
};

function CommentCard({ comment }: CommentCardProps): JSX.Element {
  const { user, rating, text } = comment;
  const { id, name, avatar } = user;

  return (
    <div className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <img
              src={getFileUrl(avatar)}
              width={64}
              height={64}
              alt="Изображение пользователя"
            />
          </div>
          <Link to={`${AppRoute.Users}/${id}`}>
            <span className="review__user-name">{name}</span>
          </Link>
          <div className="review__rating">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">{text}</p>
      </div>
    </div>
  );
}

export default CommentCard;
