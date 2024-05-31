import { render, screen } from '@testing-library/react';
import { makeFakeComment, withHistory } from '../../utils';
import CommentCard from './comment-card.component';
import { Comment } from '../../types';

describe('Component: CommentCard', () => {
  it('should render correct', () => {
    const expectedAltText = 'Изображение пользователя';
    const mockComment: Comment = makeFakeComment();
    const {
      user: { name },
      rating,
      text,
    } = mockComment;
    const preparedComponent = withHistory(
      <CommentCard comment={mockComment} />,
    );

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
