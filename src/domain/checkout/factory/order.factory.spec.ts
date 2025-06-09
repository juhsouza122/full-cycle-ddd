import { describe, it, expect } from '@jest/globals';
import { v7 as uuid } from 'uuid';
import OrderFactory from './order.factory';
describe('OrderFactory', () => {
  it('should create an order', () => {
    const orderProps = {
      customerId: uuid(),
      items: [
        {
          name: 'Product 1',
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };
    const order = OrderFactory.create(orderProps);
    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
