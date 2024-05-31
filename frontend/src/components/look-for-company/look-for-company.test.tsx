import { render, screen } from '@testing-library/react';
import {
  makeFakeMainDataSlice,
  makeFakeUser,
  withHistory,
  withStore,
} from '../../utils';
import LookForCompany from './look-for-company.component';
import { MainData } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderButtons: () => (
    <div data-testid="sliderButtons">SliderButtons component</div>
  ),
  UserCard: () => <div data-testid="userCard">UserCard component</div>,
  UserCardType: vi.fn(),
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: LookForCompany', () => {
  it('should render correct', () => {
    const expectedText1 = 'Ищут компанию для тренировки';
    const expectedText2 = 'Смотреть все';
    const buttonsTestId = 'sliderButtons';
    const sliderTestId = 'slider';
    const itemTestId = 'userCard';
    const mockSlice: MainData = {
      ...makeFakeMainDataSlice(),
      readyUsers: [makeFakeUser()],
    };
    const { withStoreComponent } = withStore(<LookForCompany />, {
      MAIN_DATA: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(buttonsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId)).toHaveLength(1);
  });
});
