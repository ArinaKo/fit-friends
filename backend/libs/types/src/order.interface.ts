import { OrderType } from './order-type.enum';
import { PaymentType } from './payment-type.enum';

export interface Order {
  id?: string;
  userId: string;
  type: OrderType;
  workoutId: string;
  workoutPrice: number;
  count: number;
  totalPrice: number;
  paymentType: PaymentType;
}
