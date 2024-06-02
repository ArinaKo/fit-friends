import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeComment,
  makeFakeCommentFormSlice,
  makeFakeWorkout,
  withStore,
} from '../../utils';
import CommentForm from './comment-form.component';
import { sendCommentAction, setCommentRequiredFields } from '../../store';
import userEvent from '@testing-library/user-event';
import { APIRoute } from '../../const';

describe('Component: CommentForm', () => {
  const submitButtonTestId = 'submitButton';
  const mockSlice = makeFakeCommentFormSlice();
  const fakeWorkout = makeFakeWorkout();
  const fakeComment = makeFakeComment();

  it('should render correct', () => {
    const expectedText1 = 'Оцените тренировку';
    const expectedText2 = 'Поделитесь своими впечатлениями о тренировке';
    const expectedText3 = 'Продолжить';
    const { withStoreComponent } = withStore(<CommentForm />, {
      COMMENT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values', () => {
    const { rating, text } = mockSlice;
    const { withStoreComponent } = withStore(<CommentForm />, {
      COMMENT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(rating)).toBeInTheDocument();
    expect(screen.getByDisplayValue(text)).toBeInTheDocument();
  });

  it('should dispatch "setCommentRequiredFields", "sendCommentAction.pending" and "sendCommentAction.fulfilled" when user click submit button', async () => {
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <CommentForm />,
      {
        COMMENT_FORM: mockSlice,
      },
    );
    mockAxiosAdapter.onPost(APIRoute.Comments).reply(201, fakeComment);
    mockAxiosAdapter
      .onGet(`${APIRoute.Workouts}/${mockSlice.workoutId}`)
      .reply(200, fakeWorkout);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(submitButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setCommentRequiredFields.type,
      sendCommentAction.pending.type,
      sendCommentAction.fulfilled.type,
    ]);
  });
});
