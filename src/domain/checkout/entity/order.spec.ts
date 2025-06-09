import Order from './order';
import { describe, it, expect } from '@jest/globals';
import OrderItem from './order_item';
describe('Order', () => {
  it('should create an order without items', () => {
    const order = new Order('1', '1', []);
    expect(order.id).toBe('1');
    expect(order.customerId).toBe('1');
    expect(order.items).toEqual([]);
  });

  it('should create an order with items', () => {
    const item = new OrderItem('1', 'sapato', 10, '1', 1);
    const order = new Order('1', '1', [item]);
    expect(order.id).toBe('1');
    expect(order.customerId).toBe('1');
    expect(order.items).toEqual([item]);
  });

  it('should add an item to the order', () => {
    const order = new Order('1', '1', []);
    const item = new OrderItem('1', 'sapato', 10, '1', 1);
    order.addItem(item);
    expect(order.items).toEqual([item]);
  });

  it('should throw an error if customer ID is invalid', () => {
    const item = new OrderItem('1', 'sapato', 10, '1', 1);
    expect(() => new Order('1', '', [item])).toThrow('Customer ID is required');
  });

  it('should throw an error if ID is invalid', () => {
    const item = new OrderItem('1', 'sapato', 10, '1', 1);
    expect(() => new Order('', '1', [item])).toThrow('Order ID is required');
  });

  it('should throw an error if item is invalid', () => {
    expect(
      () => new Order('1', '1', [new OrderItem('1', '', 10, '1', 1)]),
    ).toThrow('Item name is required');
  });

  it('should calculate the total of the order', () => {
    const item1 = new OrderItem('1', 'sapato', 10, '1', 1);
    const item2 = new OrderItem('2', 'camisa', 20, '2', 2);
    const order = new Order('1', '1', [item1, item2]);
    expect(order.total()).toBe(50);
  });

  it('should calculate the total of the order with no items', () => {
    const order = new Order('1', '1', []);
    expect(order.total()).toBe(0);
  });

  it('should calculate the total of the order with one item', () => {
    const item = new OrderItem('1', 'sapato', 10, '1', 1);
    const order = new Order('1', '1', [item]);
    expect(order.total()).toBe(10);
  });

  it('should calculate the total of the order with zeroed price', () => {
    const item = new Order('1', '1', [
      new OrderItem('1', 'sapato', 0, '1', 1),
      new OrderItem('2', 'camisa', 0, '2', 1),
    ]);
    expect(item.total()).toBe(0);
  });

  it('should throw an error if item quantity is invalid', () => {
    expect(
      () => new Order('1', '1', [new OrderItem('1', 'sapato', 10, '1', 0)]),
    ).toThrow('Item quantity must be greater than 0');
  });
});
