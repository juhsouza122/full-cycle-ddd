import { describe, it, expect } from '@jest/globals';
import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';
import Customer from '../../customer/entity/customer';

describe('OrderService unit tests', () => {
  it('should get total of all orders', () => {
    const item1 = new OrderItem('1', 'sapato', 10, '1', 1);
    const item2 = new OrderItem('2', 'camisa', 20, '2', 2);
    const orders = [
      new Order('1', '1', [item1]),
      new Order('2', '1', [item1, item2]),
    ];

    const total = OrderService.total(orders);

    expect(total).toBe(60);
  });

  it('should get total of all orders with no orders', () => {
    const orders: Order[] = [];

    const total = OrderService.total(orders);

    expect(total).toBe(0);
  });

  it('should get total of all orders with one order', () => {
    const item1 = new OrderItem('1', 'sapato', 10, '1', 1);
    const orders = [new Order('1', '1', [item1])];

    const total = OrderService.total(orders);

    expect(total).toBe(10);
  });

  it('should get total of all orders with one order with no items', () => {
    const orders = [new Order('1', '1', [])];

    const total = OrderService.total(orders);

    expect(total).toBe(0);
  });

  it('shold place an order', () => {
    const customer = new Customer('1', 'John Doe');
    const item1 = new OrderItem('1', 'sapato', 10, '1', 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('shold place an order with no items', () => {
    const customer = new Customer('1', 'John Doe');
    const items: OrderItem[] = [];

    expect(() => OrderService.placeOrder(customer, items)).toThrow(
      'Order must have at least one item',
    );
  });
});
