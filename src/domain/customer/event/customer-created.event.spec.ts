import { describe, expect, it, jest } from '@jest/globals';
import CustomerCreatedEvent from './customer-created.event';
import Customer from '../entity/customer';
import {
  SendConsoleLog1Handler,
  SendConsoleLog2Handler,
} from './handler/send-console-log-when-customer-created.handler';

describe('CustomerCreatedEvent', () => {
  it('should create a customer created event', () => {
    const event = new CustomerCreatedEvent({
      id: '1',
      name: 'John Doe',
    });

    expect(event.dateTimeOcurred).toBeInstanceOf(Date);
    expect(event.eventData).toEqual({ id: '1', name: 'John Doe' });
  });

  it('should create a customer created event with empty data', () => {
    const event = new CustomerCreatedEvent({});

    expect(event.dateTimeOcurred).toBeInstanceOf(Date);
    expect(event.eventData).toEqual({});
  });

  it('should notify when a customer is created', () => {
    const customerCreatedEvent1Spy = jest.spyOn(
      SendConsoleLog1Handler.prototype,
      'handle',
    );
    const customerCreatedEvent2Spy = jest.spyOn(
      SendConsoleLog2Handler.prototype,
      'handle',
    );
    new Customer('1', 'John Doe');

    expect(customerCreatedEvent1Spy).toHaveBeenCalledTimes(1);
    expect(customerCreatedEvent2Spy).toHaveBeenCalledTimes(1);
  });

  it('should not notify when customer is invalid', () => {
    const customerCreatedEvent1Spy = jest.spyOn(
      SendConsoleLog1Handler.prototype,
      'handle',
    );
    const customerCreatedEvent2Spy = jest.spyOn(
      SendConsoleLog2Handler.prototype,
      'handle',
    );

    expect(() => new Customer('', 'John Doe')).toThrow('ID is required');

    expect(customerCreatedEvent1Spy).not.toHaveBeenCalled();
    expect(customerCreatedEvent2Spy).not.toHaveBeenCalled();
  });
});
