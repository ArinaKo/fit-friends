import { render, screen } from '@testing-library/react';
import Certificate from './certificate.component';
import { makeFakeAppDataSlice, makeFakeFileData, withHistory, withStore } from '../../utils';

describe('Component: Certificate', () => {
  it('should render correct', () => {
    const expectedTestId = 'certificate';
    const mockFile = makeFakeFileData();
    const { withStoreComponent } = withStore(<Certificate file={mockFile} />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
