import { describe, it, expect } from '@jest/globals';
import CustomerFactory from './customer.factory';
import Address from '../value-object/address';

describe('CustomerFactory', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('123 Main St', '12345678', 'Springfield', '1');
    const customer = CustomerFactory.createWithAddress('John Doe', address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBe(address);
  });
});
