import { useAppSelector } from '../../hooks';
import { getWorkoutComments, isBalancesListLoading } from '../../store';
import { CommentCard, UIBlocker } from '../index';

function CommentsList(): JSX.Element {
  const comments = useAppSelector(getWorkoutComments);
  const isDataLoading = useAppSelector(isBalancesListLoading);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <div className="reviews-side-bar__container">
      {comments.length ? (
        <ul className="reviews-side-bar__list">
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
