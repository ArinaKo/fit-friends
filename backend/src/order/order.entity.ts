import { Entity } from '@app/core';
import { Order, OrderType, PaymentType } from '@app/types';

export class OrderEntity implements Order, Entity<string> {
  public id?: string;
  public userId: string;
  public type: OrderType;
  public workoutId: string;
  public workoutPrice: number;
  public count: number;
  public totalPrice: number;
  public paymentType: PaymentType;

  constructor(data: Order) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      workoutId: this.workoutId,
      workoutPrice: this.workoutPrice,
      count: this.count,
      totalPrice: this.totalPrice,
      paymentType: this.paymentType,
    };
  }

  public populate(data: Order): void {
    this.id = data.id;
    this.userId = data.userId;
    this.type = data.type;
    this.workoutId = data.workoutId;
    this.workoutPrice = data.workoutPrice;
    this.count = data.count;
    this.totalPrice = data.totalPrice;
    this.paymentType = data.paymentType;
  }

  static fromObject(data: Order): OrderEntity {
    return new OrderEntity(data);
  }
}
