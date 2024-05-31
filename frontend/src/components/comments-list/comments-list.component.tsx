import { useAppSelector } from '../../hooks';
import { getWorkoutComments, isWorkoutInfoLoading } from '../../store';
import { CommentCard, UIBlocker } from '../index';

function CommentsList(): JSX.Element {
  const comments = useAppSelector(getWorkoutComments);
  const isDataLoading = useAppSelector(isWorkoutInfoLoading);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <div className="reviews-side-bar__container">
      {comments.length ? (
        <ul className="reviews-side-bar__list" data-testid="commentsList">
          {comments.map((comment) => (
            <CommentCard comment={comment} key={`comment-${comment.id}`} />
          ))}
        </ul>
      ) : (
        <p>Отзывов пока нет. Желаете быть первым?</p>
      )}
    </div>
  );
}

export default CommentsList;
