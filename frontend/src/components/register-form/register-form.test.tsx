import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withHistory,
  withStore,
} from '../../utils';
import RegisterForm from './register-form.component';
import {
  registerAction,
  setAvatar,
  setRegisterRequiredFields,
  setUserFormError,
} from '../../store';
import { APIRoute } from '../../const';

describe('Component: RegisterForm', () => {
  const fileInputTestId = 'fileInput';
  const submitButtonTestId = 'submitButton';
  const mockSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const { withStoreComponent } = withStore(<RegisterForm />, {
      USER_FORM: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузите фото профиля')).toBeInTheDocument();
    expect(
      screen.getByText('JPG, PNG, оптимальный размер 100×100 px'),
    ).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Ваша локация')).toBeInTheDocument();
    expect(screen.getByText('Дата рождения')).toBeInTheDocument();
    expect(screen.getByText('Пол')).toBeInTheDocument();
    expect(screen.getByText('Выберите роль')).toBeInTheDocument();
    expect(screen.getByText('Я хочу тренироваться')).toBeInTheDocument();
    expect(screen.getByText('Я хочу тренировать')).toBeInTheDocument();
    expect(
      screen.getByText('политикой конфиденциальности'),
    ).toBeInTheDocument();
    expect(screen.getByText('Продолжить')).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values', () => {
    const { email, password, name, location } = mockSlice;
    const { withStoreComponent } = withStore(<RegisterForm />, {
      USER_FORM: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    expect(screen.getAllByText(`ст. м. ${location ?? ''}`)).toHaveLength(2);
  });

  it('should dispatch "setRegisterRequiredFields" and "registerAction.pending" when form submitted', () => {
    const mockFile = new File([], '');
    global.URL.createObjectURL = vi.fn(() => 'image.jpg');
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <RegisterForm />,
      {
        USER_FORM: mockSlice,
      },
    );
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(APIRoute.Register).reply(201, {});

    render(preparedComponent);
    fireEvent.change(screen.getByTestId(fileInputTestId), {
      target: { files: [mockFile] },
    });
    fireEvent.submit(screen.getByRole('form'));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setAvatar.type,
      setUserFormError.type,
      setRegisterRequiredFields.type,
      registerAction.pending.type,
    ]);
  });
});
