import { render, screen } from '@testing-library/react';
import { makeFakeUser, withHistory } from '../../utils';
import UserCard from './user-card.component';
import { UserCardType } from './user-card';
import { RequestStatus } from '../../const';

vi.mock('./user-card-inner.component', () => ({
  default: () => <div data-testid="userCardInner">UserCardInner component</div>,
}));

vi.mock('./activity-bar.component', () => ({
  default: () => <div data-testid="activityBar">ActivityBar component</div>,
}));

vi.mock('./request.component', () => ({
  default: () => <div data-testid="request">Request component</div>,
}));

describe('Component: UserCard', () => {
  const innerComponentTestId = 'userCardInner';
  const activityBarTestId = 'activityBar';
  const requestTestId = 'request';

  it('should render correct with default type', () => {
    const expectedText = 'Подробнее';
    const mockUser = makeFakeUser();
    const preparedComponent = withHistory(
      <UserCard user={mockUser} type={UserCardType.Default} styleClass="" />,
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(innerComponentTestId)).toBeInTheDocument();
  });

  it('should render correct with type "friend"', () => {
    const notExpectedText = 'Подробнее';
    const mockUser = makeFakeUser();
    const preparedComponent = withHistory(
      <UserCard
        user={mockUser}
        type={UserCardType.Friend}
        workoutRequest={{ id: '', status: RequestStatus.Default }}
        styleClass=""
      />,
    );

    render(preparedComponent);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByTestId(innerComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(activityBarTestId)).toBeInTheDocument();
    expect(screen.getByTestId(requestTestId)).toBeInTheDocument();
  });

  it('should render correct without workout request', () => {
    const mockUser = makeFakeUser();
    const preparedComponent = withHistory(
      <UserCard user={mockUser} type={UserCardType.Friend} styleClass="" />,
    );

    render(preparedComponent);

    expect(screen.queryByTestId(requestTestId)).not.toBeInTheDocument();
  });
});
