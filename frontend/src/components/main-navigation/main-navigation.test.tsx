import { render, screen } from '@testing-library/react';
import MainNavigation from './main-navigation.component';
import { makeFakeAppDataSlice, withHistory, withStore } from '../../utils';
import { AppData } from '../../types';
import { UserRole } from '../../const';

vi.mock('../index', () => ({
  default: vi.fn(),
  NotificationsList: () => (
    <div data-testid="notificationList">NotificationList component</div>
  ),
}));

describe('Component: MainNavigation', () => {
  it('should render correct', () => {
    const containerTestId = 'mainNavContainer';
    const itemTestId = 'mainNavItem';
    const childComponentTestId = 'notificationList';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(<MainNavigation />, {
      APP_DATA: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(childComponentTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId)).toHaveLength(3);
  });
});
