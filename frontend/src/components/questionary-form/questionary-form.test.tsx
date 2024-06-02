import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeAppDataSlice,
  makeFakeUserFormSlice,
  withStore,
} from '../../utils';
import QuestionaryForm from './questionary-form.component';
import { APIRoute, UserRole } from '../../const';
import { AppData, UserForm } from '../../types';
import userEvent from '@testing-library/user-event';
import lodash from 'lodash';
import {
  setCustomerQuestionaryRequiredFields,
  questionaryCustomerAction,
  setCoachQuestionaryRequiredFields,
  questionaryCoachAction,
  setCertificatesAmount,
  setUserFormError,
} from '../../store';
import { redirectToRoute } from '../../store/actions';

describe('Component: QuestionaryForm', () => {
  const submitButtonTestId = 'submitButton';
  const filesInputTestId = 'filesInput';
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct for customer', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(<QuestionaryForm />, {
      APP_DATA: appDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(
      screen.getByText('Ваша специализация (тип) тренировок'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Сколько времени вы готовы уделять на тренировку в день',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Ваш уровень')).toBeInTheDocument();
    expect(
      screen.getByText('Сколько калорий хотите сбросить'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Сколько калорий тратить в день'),
    ).toBeInTheDocument();
    expect(screen.getByText('Продолжить')).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should render correct for coach', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const { withStoreComponent } = withStore(<QuestionaryForm />, {
      APP_DATA: appDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(
      screen.getByText('Ваша специализация (тип) тренировок'),
    ).toBeInTheDocument();
    expect(screen.getByText('Ваш уровень')).toBeInTheDocument();
    expect(screen.getByText('Ваши дипломы и сертификаты')).toBeInTheDocument();
    expect(
      screen.getByText('Расскажите о своём опыте, который мы сможем проверить'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Хочу дополнительно индивидуально тренировать'),
    ).toBeInTheDocument();
    expect(screen.getByText('Продолжить')).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values for customer', () => {
    const {
      workoutTypes,
      timeForWorkout,
      level,
      caloriesPerDay,
      caloriesToLose,
    } = mockUserFormSlice;
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(<QuestionaryForm />, {
      APP_DATA: appDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(caloriesPerDay)).toBeInTheDocument();
    expect(screen.getByDisplayValue(caloriesToLose)).toBeInTheDocument();
    expect(
      screen.getByLabelText(lodash.capitalize(workoutTypes[0])),
    ).toBeChecked();
    expect(screen.getByLabelText(`${timeForWorkout} мин`)).toBeChecked();
    expect(screen.getByLabelText(lodash.capitalize(level))).toBeChecked();
  });

  it('should display correct values for coach', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const userFormSlice: UserForm = {
      ...mockUserFormSlice,
      certificatesAmount: 1,
    };
    const { workoutTypes, level, achievements } = mockUserFormSlice;
    const { withStoreComponent } = withStore(<QuestionaryForm />, {
      APP_DATA: appDataSlice,
      USER_FORM: userFormSlice,
    });

    render(withStoreComponent);

    expect(
      screen.getByLabelText(lodash.capitalize(workoutTypes[0])),
    ).toBeChecked();
    expect(screen.getByLabelText(lodash.capitalize(level))).toBeChecked();
    expect(screen.getByDisplayValue(achievements)).toBeInTheDocument();
    expect(screen.getByText('Загружен 1 сертификат')).toBeInTheDocument();
  });

  it('should dispatch "setCustomerQuestionaryRequiredFields", "questionaryCustomerAction.pending" and "questionaryCustomerAction.fulfilled" when customer user click save button', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <QuestionaryForm />,
      {
        APP_DATA: appDataSlice,
        USER_FORM: mockUserFormSlice,
      },
    );
    mockAxiosAdapter.onPatch(APIRoute.QuestionaryUser).reply(204);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(submitButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setCustomerQuestionaryRequiredFields.type,
      questionaryCustomerAction.pending.type,
      redirectToRoute.type,
      questionaryCustomerAction.fulfilled.type,
    ]);
  });

  it('should dispatch "setCoachQuestionaryRequiredFields", "questionaryCoachAction.pending" and "questionaryCoachAction.fulfilled" when coach user click save button', async () => {
    const mockFile = new File([], '');
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <QuestionaryForm />,
      {
        APP_DATA: appDataSlice,
        USER_FORM: mockUserFormSlice,
      },
    );
    mockAxiosAdapter.onPatch(APIRoute.QuestionaryCoach).reply(204);

    render(withStoreComponent);
    fireEvent.change(screen.getByTestId(filesInputTestId), {
      target: { files: [mockFile] },
    });
    await userEvent.click(screen.getByTestId(submitButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setCertificatesAmount.type,
      setUserFormError.type,
      setCoachQuestionaryRequiredFields.type,
      questionaryCoachAction.pending.type,
      redirectToRoute.type,
      questionaryCoachAction.fulfilled.type,
    ]);
  });
});
