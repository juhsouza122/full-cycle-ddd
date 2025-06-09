import OrderItem from './order_item';
import { describe, it, expect } from '@jest/globals';
describe('ItemItem Entity', () => {
  it('should create an order item with valid attributes', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);

    expect(item.id).toBe('1');
    expect(item.name).toBe('Item 1');
    expect(item.price).toBe(100);
    expect(item.productId).toBe('1');
    expect(item.quantity).toBe(1);
  });

  it('should throw an error if item ID is invalid', () => {
    expect(() => new OrderItem('', 'Item 1', 100, '1', 1)).toThrow(
      'Item ID is required',
    );
  });

  it('should throw an error if item name is invalid', () => {
    expect(() => new OrderItem('1', '', 100, '1', 1)).toThrow(
      'Item name is required',
    );
    expect(() => new OrderItem('1', 'A', 100, '1', 1)).toThrow(
      'Item name is required',
    );
  });

  it('should throw an error if item price is invalid', () => {
    expect(() => new OrderItem('1', 'Item 1', -0.1, '1', 1)).toThrow(
      'Item price does not allow negative values',
    );
    expect(() => new OrderItem('1', 'Item 1', -100, '1', 1)).toThrow(
      'Item price does not allow negative values',
    );
  });

  it('should throw an error if item quantity is invalid', () => {
    expect(() => new OrderItem('1', 'Item 1', 100, '1', 0)).toThrow(
      'Item quantity must be greater than 0',
    );
    expect(() => new OrderItem('1', 'Item 1', 100, '1', -1)).toThrow(
      'Item quantity must be greater than 0',
    );
  });

  it('should throw an error if product ID is invalid', () => {
    expect(() => new OrderItem('1', 'Item 1', 100, '', 1)).toThrow(
      'Product ID is required',
    );
  });

  it('should change the item name', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);
    item.changeName('Item 2');

    expect(item.name).toBe('Item 2');
  });

  it('should throw an error if item name is changed to invalid', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);
    expect(() => item.changeName('')).toThrow('Item name is required');
    expect(() => item.changeName('A')).toThrow('Item name is required');
  });

  it('should change the item price', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);
    item.changePrice(200);

    expect(item.price).toBe(200);
  });

  it('should throw an error if item price is changed to invalid', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);
    expect(() => item.changePrice(-0.1)).toThrow(
      'Item price does not allow negative values',
    );
    expect(() => item.changePrice(-100)).toThrow(
      'Item price does not allow negative values',
    );
  });

  it('should change the item quantity', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);
    item.changeQuantity(2);

    expect(item.quantity).toBe(2);
  });

  it('should throw an error if item quantity is changed to invalid', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 1);
    expect(() => item.changeQuantity(0)).toThrow(
      'Item quantity must be greater than 0',
    );
    expect(() => item.changeQuantity(-1)).toThrow(
      'Item quantity must be greater than 0',
    );
  });
});
