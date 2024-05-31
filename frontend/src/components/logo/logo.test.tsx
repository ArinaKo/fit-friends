import { render, screen } from '@testing-library/react';
import Logo from './logo.component';
import { makeFakeAppDataSlice, withHistory, withStore } from '../../utils';

describe('Component: Logo', () => {
  it('should render correct', () => {
    const expectedTestId = 'Logo';
    const { withStoreComponent } = withStore(<Logo />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
