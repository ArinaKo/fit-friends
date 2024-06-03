import { render, screen } from '@testing-library/react';
import UsersCatalogPage from './users-catalog-page.component';
import {
  withStore,
  withHistory,
  makeFakeAppDataSlice,
  makeFakeUserDataSlice,
} from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  UsersFilter: () => <div>UsersFilter</div>,
  UsersList: () => <div>UsersList</div>,
  UsersListType: vi.fn(),
}));

describe('Component: UsersCatalogPage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<UsersCatalogPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      USER_DATA: makeFakeUserDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Каталог пользователей')).toBeInTheDocument();
    expect(screen.getByText('Фильтры')).toBeInTheDocument();
    expect(screen.getByText('UsersFilter')).toBeInTheDocument();
    expect(screen.getByText('UsersList')).toBeInTheDocument();
  });
});
