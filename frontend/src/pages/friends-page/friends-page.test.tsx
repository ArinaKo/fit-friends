import { render, screen } from '@testing-library/react';
import FriendsPage from './friends-page.component';
import { withStore, withHistory } from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  UsersList: () => <div>UsersList</div>,
  UsersListType: vi.fn(),
}));

describe('Component: FriendsPage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<FriendsPage />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByText('UsersList')).toBeInTheDocument();
  });
});
