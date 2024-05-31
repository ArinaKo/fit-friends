import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route.component';
import { render, screen } from '@testing-library/react';
import { makeFakeAppDataSlice } from '../../utils';
import { AppData } from '../../types';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Account);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.NoAuth,
    };
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.Account}
          element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory,
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      APP_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Auth,
    };
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route
          path={AppRoute.Account}
          element={
            <PrivateRoute>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory,
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      APP_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render ui blocker, when user authorization status is unknown', () => {
    const expectedText = /Loading/i;
    const notExpectedText = 'private route';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Unknown,
    };
    const withHistoryComponent = withHistory(
      <Routes>
        <Route
          path={AppRoute.Account}
          element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory,
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      APP_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
