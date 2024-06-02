import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../utils';
import LoginForm from './login-form.component';
import { loginAction, setLoginRequiredFields } from '../../store';
import userEvent from '@testing-library/user-event';
import { APIRoute } from '../../const';
import { redirectToRoute } from '../../store/actions';

describe('Component: LoginForm', () => {
  const submitButtonTestId = 'submitButton';
  const mockSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const expectedText1 = 'E-mail';
    const expectedText2 = 'Пароль';
    const expectedText3 = 'Продолжить';
    const { withStoreComponent } = withStore(<LoginForm />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values', () => {
    const { email, password } = mockSlice;
    const { withStoreComponent } = withStore(<LoginForm />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();
  });

  it('should dispatch "setLoginRequiredFields", "loginAction.pending" and "loginAction.fulfilled" when user click submit button', async () => {
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <LoginForm />,
      {
        USER_FORM: mockSlice,
      },
    );
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {});

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(submitButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setLoginRequiredFields.type,
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);
  });
});
