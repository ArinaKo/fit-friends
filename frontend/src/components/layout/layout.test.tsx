import { render, screen } from '@testing-library/react';
import { makeFakeUserDataSlice, withStore } from '../../utils';
import Layout from './layout.component';
import { UserData } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  Logo: () => <div data-testid="logo">Logo component</div>,
  MainNavigation: () => (
    <div data-testid="mainNavigation">MainNavigation component</div>
  ),
}));

describe('Component: Layout', () => {
  it('should render correct', () => {
    const expectedText = 'Поиск';
    const mainElementTestId = 'mainElement';
    const innerComponentTestId1 = 'logo';
    const innerComponentTestId2 = 'mainNavigation';
    const mockSlice: UserData = {
      ...makeFakeUserDataSlice(),
    };
    const { withStoreComponent } = withStore(<Layout />, {
      USER_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(mainElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(innerComponentTestId1)).toBeInTheDocument();
    expect(screen.getByTestId(innerComponentTestId2)).toBeInTheDocument();
  });
});
