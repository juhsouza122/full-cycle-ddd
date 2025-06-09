import Address from './address';
import { describe, expect, it } from '@jest/globals';
describe('Address Value Object', () => {
  it('should create a valid Address instance', () => {
    const address = new Address('Main St', '12345678', 'Cityville', '123');
    expect(address).toBeInstanceOf(Address);
    expect(address.toString()).toBe('Main St, 123, 12345678 Cityville');
  });

  it('should create a valid Address instance with default number', () => {
    const address = new Address('Main St', '12345678', 'Cityville');
    expect(address).toBeInstanceOf(Address);
    expect(address.toString()).toBe('Main St, S/N, 12345678 Cityville');
  });

  it('should throw an error for invalid street', () => {
    expect(() => new Address('', '12345678', 'Cityville')).toThrow(
      'An valid street is required',
    );
    expect(() => new Address('A', '12345678', 'Cityville')).toThrow(
      'An valid street is required',
    );
  });

  it('should throw an error for invalid number', () => {
    expect(() => new Address('Main St', '12345678', 'Cityville', '')).toThrow(
      'An valid number is required',
    );
  });

  it('should throw an error for invalid zip', () => {
    expect(() => new Address('Main St', '123', 'Cityville')).toThrow(
      'An valid zip is required',
    );
  });

  it('should throw an error for invalid city', () => {
    expect(() => new Address('Main St', '12345678', '')).toThrow(
      'An valid city is required',
    );
    expect(() => new Address('Main St', '12345678', 'A')).toThrow(
      'An valid city is required',
    );
  });

  it('should return the correct string representation', () => {
    const address = new Address('Main St', '12345678', 'Cityville', '123');
    expect(address.toString()).toBe('Main St, 123, 12345678 Cityville');
  });
});
