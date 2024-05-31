import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeFileData,
  makeFakeUserDataSlice,
  withStore,
} from '../../utils';
import AccountCertificates from './account-certificates.component';
import { UserData } from '../../types';
import { uploadCertificateAction } from '../../store';
import { APIRoute } from '../../const';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderButtons: () => (
    <div data-testid="sliderButtons">SliderButtons component</div>
  ),
  CertificateCard: () => (
    <div data-testid="certificateCard">CertificateCard component</div>
  ),
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: AccountCertificates', () => {
  it('should render correct', () => {
    const expectedText1 = 'Дипломы и сертификаты';
    const expectedText2 = 'Загрузить';
    const inputTestId = 'uploadInput';
    const buttonsTestId = 'sliderButtons';
    const sliderTestId = 'slider';
    const itemTestId = 'certificateCard';
    const mockSlice: UserData = {
      ...makeFakeUserDataSlice(),
      certificates: [makeFakeFileData()],
    };
    const { withStoreComponent } = withStore(<AccountCertificates />, {
      USER_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId)).toHaveLength(1);
  });

  it('should dispatch "uploadCertificateAction.pending" and "uploadCertificateAction.fulfilled" when file uploaded', async () => {
    const inputTestId = 'uploadInput';
    const mockFile = new File([], '');
    const mockSlice: UserData = makeFakeUserDataSlice();
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <AccountCertificates />,
      {
        USER_DATA: mockSlice,
      },
    );
    mockAxiosAdapter
      .onPatch(APIRoute.UploadCertificate)
      .reply(201, makeFakeFileData());

    render(withStoreComponent);
    await act(() =>
      fireEvent.change(screen.getByTestId(inputTestId), {
        target: { files: [mockFile] },
      }),
    );
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      uploadCertificateAction.pending.type,
      uploadCertificateAction.fulfilled.type,
    ]);
  });
});
