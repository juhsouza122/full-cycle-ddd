import Customer from './customer';
import { describe, it, expect } from '@jest/globals';
import Address from '../value-object/address';

describe('Customer', () => {
  it('should create a customer', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.id).toBe('1');
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should throw an error if ID is missing', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('ID is required');
  });

  it('should throw an error if name is too short', () => {
    expect(() => new Customer('1', 'J')).toThrow('An valid name is required');
  });

  it('should change the name', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeName('Jane Doe');
    expect(customer.name).toBe('Jane Doe');
  });

  it('should throw an error if the new name is too short', () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.changeName('J')).toThrow('An valid name is required');
  });

  it('should activate the customer', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(new Address('Main St.', '12345-678', 'Springfield'));
    customer.deactivate();
    customer.activate();
    expect(customer.isActive).toBe(true);
  });

  it('should throw an error if customer is already active', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(new Address('Main St.', '12345-678', 'Springfield'));
    expect(() => customer.activate()).toThrow('Customer is already active');
  });

  it('should throw an error if address is missing to activate customer', () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.activate()).toThrow(
      'Address is required to activate customer',
    );
  });

  it('should deactivate the customer', () => {
    const customer = new Customer('1', 'John Doe');
    customer.deactivate();
    expect(customer.isActive).toBe(false);
  });

  it('should throw an error if customer is already inactive', () => {
    const customer = new Customer('1', 'John Doe');
    customer.deactivate();
    expect(() => customer.deactivate()).toThrow('Customer is already inactive');
  });

  it('shold add reward points', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);
  });

  it('shold add reward points twice', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    customer.addRewardPoints(20);

    expect(customer.rewardPoints).toBe(30);
  });

  it('shold remove reward points', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    customer.addRewardPoints(20);
    customer.addRewardPoints(-5);

    expect(customer.rewardPoints).toBe(25);
  });

  it('shold throw an error if reward points are negative', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    expect(() => customer.addRewardPoints(-5)).toThrow(
      'Reward points cannot be negative',
    );
  });

  it('should change the address', () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main St.', '12345-678', 'Springfield');
    customer.changeAddress(address);
    expect(customer.address).toBe(address);
  });
});
