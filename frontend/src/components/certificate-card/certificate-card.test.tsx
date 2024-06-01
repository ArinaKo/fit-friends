import { fireEvent, render, screen } from '@testing-library/react';
import { extractActionsTypes, makeFakeFileData, withStore } from '../../utils';
import CertificateCard from './certificate-card.component';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { deleteCertificateAction, updateCertificateAction } from '../../store';
import { APIRoute } from '../../const';

describe('Component: CertificateCard', () => {
  const mockCertificate = makeFakeFileData();
  const editButtonTestId = 'editButton';
  const saveButtonTestId = 'saveButton';
  const deleteButtonTestId = 'deleteButton';
  const fileInputTestId = 'fileInput';
  const imageTestId = 'image';
  const mockFile = new File([], '');
  const mockFileData = makeFakeFileData();

  it('should render correct', () => {
    const expectedText = 'Изменить';
    const { withStoreComponent } = withStore(
      <CertificateCard
        certificate={mockCertificate}
        isActive={false}
        setActive={vi.fn()}
      />,
      {},
    );

    render(withStoreComponent);

    expect(screen.getByTestId(imageTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(editButtonTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should render correct when edited', () => {
    const expectedText = 'Сохранить';
    const { withStoreComponent } = withStore(
      <CertificateCard
        certificate={mockCertificate}
        isActive
        setActive={vi.fn()}
      />,
      {},
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(saveButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(fileInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(deleteButtonTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(editButtonTestId)).not.toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('should render correctly when user click delete button', async () => {
    const expectedText = 'Сертификат удален';
    const { withStoreComponent } = withStore(
      <CertificateCard
        certificate={mockCertificate}
        isActive
        setActive={vi.fn()}
      />,
      {},
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(deleteButtonTestId));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByTestId(imageTestId)).not.toBeInTheDocument();
  });

  it('should render correctly when user upload new file', async () => {
    global.URL.createObjectURL = vi.fn(() => 'image.jpg');
    const expectedValue =
      'image.jpg#toolbar=0&nopageaction=1&nozoom=1&nosidebar=1&navpanes=0&statusbar=0&view=fit';
    const { withStoreComponent } = withStore(
      <CertificateCard
        certificate={mockCertificate}
        isActive
        setActive={vi.fn()}
      />,
      {},
    );

    render(withStoreComponent);
    await act(() =>
      fireEvent.change(screen.getByTestId(fileInputTestId), {
        target: { files: [mockFile] },
      }),
    );

    expect(screen.queryByTestId(imageTestId)).toHaveAttribute(
      'src',
      expectedValue,
    );
  });

  it('should dispatch "updateCertificateAction.pending" and "updateCertificateAction.fulfilled" when file uploaded and user click button save', async () => {
    global.URL.createObjectURL = vi.fn(() => '');
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <CertificateCard
        certificate={mockCertificate}
        isActive
        setActive={vi.fn()}
      />,
      {},
    );
    mockAxiosAdapter
      .onPatch(APIRoute.UpdateCertificate)
      .reply(200, mockFileData);

    render(withStoreComponent);
    await act(() =>
      fireEvent.change(screen.getByTestId(fileInputTestId), {
        target: { files: [mockFile] },
      }),
    );
    await userEvent.click(screen.getByTestId(saveButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      updateCertificateAction.pending.type,
      updateCertificateAction.fulfilled.type,
    ]);
  });

  it('should dispatch "deleteCertificateAction.pending" and "deleteCertificateAction.fulfilled" when file uploaded and user click button save', async () => {
    global.URL.createObjectURL = vi.fn(() => '');
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <CertificateCard
        certificate={mockCertificate}
        isActive
        setActive={vi.fn()}
      />,
      {},
    );
    mockAxiosAdapter.onPatch(APIRoute.DeleteCertificate).reply(200, []);

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId(deleteButtonTestId));
    await userEvent.click(screen.getByTestId(saveButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      deleteCertificateAction.pending.type,
      deleteCertificateAction.fulfilled.type,
    ]);
  });
});
