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
      <ul className="reviews-side-bar__list">
        {comments.map((comment) => (
          <CommentCard comment={comment} key={`comment-${comment.id}`} />
        ))}
      </ul>
    </div>
  );
}

export default CommentsList;
