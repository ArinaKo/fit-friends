import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeCommentFormSlice,
  withStore,
} from '../../utils';
import RatingInput from './rating-input.component';
import { CommentForm } from '../../types';
import userEvent from '@testing-library/user-event';
import { setRating } from '../../store';

describe('Component: RatingInput', () => {
  const inputTestId = 'ratingInput';
  it('should render correct', () => {
    const expectedText = 4;
    const mockSlice: CommentForm = {
      ...makeFakeCommentFormSlice(),
      rating: expectedText,
    };
    const { withStoreComponent } = withStore(<RatingInput />, {
      COMMENT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByTestId(inputTestId)).toHaveLength(5);
  });

  it('should dispatch "setRating" when user change input value', async () => {
    const expectedValue = 1;
    const mockSlice: CommentForm = {
      ...makeFakeCommentFormSlice(),
      rating: 5,
    };
    const { withStoreComponent, mockStore } = withStore(<RatingInput />, {
      COMMENT_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.type(
      screen.getAllByTestId(inputTestId)[0],
      String(expectedValue),
    );
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setRating.type]);
    expect(screen.getByText(expectedValue)).toBeInTheDocument();
  });
});
