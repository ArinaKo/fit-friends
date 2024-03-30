import { Balance } from './balance.interface';

export interface UserBalance {
  userId?: string;
  balances: Balance[];
}
