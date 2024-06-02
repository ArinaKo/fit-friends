import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeOrderFormSlice,
  makeFakeWorkoutInfoSlice,
  withStore,
} from '../../utils';
import OrderForm from './order-form.component';
import { createOrderAction } from '../../store';
import userEvent from '@testing-library/user-event';
import { APIRoute } from '../../const';

describe('Component: OrderForm', () => {
  const submitButtonTestId = 'submitButton';
  const mockOrderFormSlice = makeFakeOrderFormSlice();
  const mockWorkoutInfoSlice = makeFakeWorkoutInfoSlice();

  it('should render correct', () => {
    const expectedAltText = 'Фотография тренировки';
    const { title, price } = mockWorkoutInfoSlice;
    const expectedText1 = 'Количество';
    const expectedText2 = 'Выберите способ оплаты';
    const expectedText3 = 'Итого';
    const expectedText4 = 'Купить';
    const { withStoreComponent } = withStore(<OrderForm />, {
      ORDER_FORM: mockOrderFormSlice,
      WORKOUT_INFO: mockWorkoutInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(`${price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByText(expectedText4)).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values', () => {
    const { count, totalSum } = mockOrderFormSlice;
    const { withStoreComponent } = withStore(<OrderForm />, {
      ORDER_FORM: mockOrderFormSlice,
      WORKOUT_INFO: mockWorkoutInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(count)).toBeInTheDocument();
    expect(screen.getByText(`${totalSum} ₽`)).toBeInTheDocument();
  });

  it('should dispatch "createOrderAction.pending" and "createOrderAction.fulfilled" when user click submit button', async () => {
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <OrderForm />,
      {
        ORDER_FORM: mockOrderFormSlice,
        WORKOUT_INFO: mockWorkoutInfoSlice,
      },
    );
    mockAxiosAdapter.onPost(APIRoute.CreateOrder).reply(201);
    mockAxiosAdapter
      .onGet(`${APIRoute.Balances}/${mockOrderFormSlice.workoutId}`)
      .reply(200, {});

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(submitButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      createOrderAction.pending.type,
      createOrderAction.fulfilled.type,
    ]);
  });
});
