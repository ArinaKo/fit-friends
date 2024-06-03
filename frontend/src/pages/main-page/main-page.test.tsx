import { render, screen } from '@testing-library/react';
import MainPage from './main-page.component';
import {
  withStore,
  withHistory,
  makeFakeAppDataSlice,
  makeFakeMainDataSlice,
} from '../../utils';
import { MainData } from '../../types';

vi.mock('../../components', () => ({
  default: vi.fn(),
  SpecialForYou: () => <div>SpecialForYou</div>,
  SpecialOffers: () => <div>SpecialOffers</div>,
  PopularWorkouts: () => <div>PopularWorkouts</div>,
  LookForCompany: () => <div>LookForCompany</div>,
  UIBlocker: () => <div>Загрузка</div>,
}));

describe('Component: MainPage', () => {
  it('should render correct', () => {
    const mockSlice: MainData = {
      ...makeFakeMainDataSlice(),
      isDataLoading: false,
    };
    const { withStoreComponent } = withStore(<MainPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      MAIN_DATA: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByText(
        'FitFriends — Время находить тренировки, спортзалы и друзей спортсменов',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('SpecialForYou')).toBeInTheDocument();
    expect(screen.getByText('SpecialOffers')).toBeInTheDocument();
    expect(screen.getByText('PopularWorkouts')).toBeInTheDocument();
    expect(screen.getByText('LookForCompany')).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const mockSlice: MainData = {
      ...makeFakeMainDataSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(<MainPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      MAIN_DATA: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});
