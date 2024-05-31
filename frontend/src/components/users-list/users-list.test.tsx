import { render, screen } from '@testing-library/react';
import UsersList from './users-list.component';
import {
  makeFakeUsersListSlice,
  makeFakeCatalogDataSlice,
  withStore,
  makeFakeUser,
} from '../../utils';
import { CatalogData, UsersList as SliceType } from '../../types';
import { UsersListType } from './users-list';

vi.mock('../index', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  CatalogButtons: () => (
    <div data-testid="catalogButtons">CatalogButtons component</div>
  ),
  UserCard: () => <div data-testid="userCard">UserCard component</div>,
}));

describe('Component: UsersList', () => {
  const catalogSlice: CatalogData = {
    ...makeFakeCatalogDataSlice(),
    currentPage: 1,
    totalPages: 2,
  };

  it('should render correct', () => {
    const listElementTestId = 'usersList';
    const itemElementTestId = 'userCard';
    const buttonsElementTestId = 'catalogButtons';
    const usersSlice: SliceType = {
      ...makeFakeUsersListSlice(),
      users: [makeFakeUser()],
    };
    const { withStoreComponent } = withStore(
      <UsersList type={UsersListType.UsersCatalog} />,
      {
        USERS_LIST: usersSlice,
        CATALOG_DATA: catalogSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(listElementTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemElementTestId)).toHaveLength(1);
    expect(screen.getByTestId(buttonsElementTestId)).toBeInTheDocument();
  });

  it('should render correct text when list is empty', () => {
    const expectedText =
      'Пользователей с выбранными характеристиками не найдено';
    const usersSlice: SliceType = {
      ...makeFakeUsersListSlice(),
      users: [],
    };
    const { withStoreComponent } = withStore(
      <UsersList type={UsersListType.UsersCatalog} />,
      {
        USERS_LIST: usersSlice,
        CATALOG_DATA: catalogSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const expectedText = 'Загрузка';
    const usersSlice: SliceType = {
      ...makeFakeUsersListSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(
      <UsersList type={UsersListType.UsersCatalog} />,
      {
        USERS_LIST: usersSlice,
        CATALOG_DATA: catalogSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
