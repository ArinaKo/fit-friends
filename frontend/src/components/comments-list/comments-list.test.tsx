import { render, screen } from '@testing-library/react';
import CommentsList from './comments-list.component';
import {
  makeFakeComment,
  makeFakeWorkoutInfoSlice,
  withStore,
} from '../../utils';
import { WorkoutInfo } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  CommentCard: () => <div data-testid="commentCard">WorkoutCard component</div>,
}));

describe('Component: CommentsList', () => {
  it('should render correct', () => {
    const listElementTestId = 'commentsList';
    const itemElementTestId = 'commentCard';
    const mockSlice: WorkoutInfo = {
      ...makeFakeWorkoutInfoSlice(),
      comments: [makeFakeComment()],
    };
    const { withStoreComponent } = withStore(<CommentsList />, {
      WORKOUT_INFO: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(listElementTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemElementTestId)).toHaveLength(1);
  });

  it('should render correct text when list is empty', () => {
    const expectedText = 'Отзывов пока нет. Желаете быть первым?';
    const mockSlice: WorkoutInfo = {
      ...makeFakeWorkoutInfoSlice(),
      comments: [],
    };
    const { withStoreComponent } = withStore(<CommentsList />, {
      WORKOUT_INFO: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const expectedText = 'Загрузка';
    const mockSlice: WorkoutInfo = {
      ...makeFakeWorkoutInfoSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(<CommentsList />, {
      WORKOUT_INFO: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
