import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import CertificatesInput from './certificates-input.component';
import { UserForm } from '../../../types';
import { setCertificatesAmount, setUserFormError } from '../../../store';

describe('Component: CertificatesInput', () => {
  const inputTestId = 'filesInput';
  const mockUserFormSlice = makeFakeUserFormSlice();
  const mockSetFiles = vi.fn();
  const mockFile = new File([], '');

  it('should render correct when empty', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      certificatesAmount: 0,
    };
    const { withStoreComponent } = withStore(
      <CertificatesInput setFiles={mockSetFiles} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(
      screen.getByText('Загрузите сюда файлы формата PDF, JPG или PNG'),
    ).toBeInTheDocument();
  });

  it('should render correct when not empty', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      certificatesAmount: 1,
    };
    const { withStoreComponent } = withStore(
      <CertificatesInput setFiles={mockSetFiles} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(screen.getByText('Загружен 1 сертификат')).toBeInTheDocument();
  });

  it('should call "setFile" and dispatch "setCertificatesAmount" and "setUserFormError" when files uploaded', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      certificatesAmount: 0,
    };
    const { withStoreComponent, mockStore } = withStore(
      <CertificatesInput setFiles={mockSetFiles} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.change(screen.getByTestId(inputTestId), {
      target: { files: [mockFile, mockFile] },
    });
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setCertificatesAmount.type,
      setUserFormError.type,
    ]);
    expect(mockSetFiles).toBeCalledTimes(1);
    expect(mockSetFiles).toBeCalledWith([mockFile, mockFile]);
  });

  it('should render error message when it exists', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      validationErrors: {
        ...mockUserFormSlice.validationErrors,
        certificatesAmount: 'error',
      },
    };
    const { withStoreComponent } = withStore(
      <CertificatesInput setFiles={mockSetFiles} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
