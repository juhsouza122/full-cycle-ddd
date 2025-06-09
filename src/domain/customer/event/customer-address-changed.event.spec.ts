import { describe, expect, it, jest } from '@jest/globals';
import EventDispatcher from '../../@shared/event/event-dispatcher';
import SendConsoleLogHandler from './handler/send-console-log-when-address-changed.handler';
import CustomerAddressChangedEvent from './customer-address-changed.event';
import Address from '../value-object/address';
import Customer from '../entity/customer';

describe('EventDispatcher domain event tests', () => {
  it('should register a customer address changed event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['CustomerAddressChangedEvent'],
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers()['CustomerAddressChangedEvent'].length,
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers()['CustomerAddressChangedEvent'][0],
    ).toEqual(eventHandler);
  });

  it('should create a customer address changed event when address is string', () => {
    const event = new CustomerAddressChangedEvent({
      id: '1',
      name: 'John Doe',
      address: 'Street 1',
    });

    expect(event.dateTimeOcurred).toBeInstanceOf(Date);
    expect(event.eventData).toEqual({
      id: '1',
      name: 'John Doe',
      address: 'Street 1',
    });
  });

  it('should create a customer address changed event when address is empty', () => {
    const event = new CustomerAddressChangedEvent({
      id: '1',
      name: 'John Doe',
      address: '',
    });

    expect(event.dateTimeOcurred).toBeInstanceOf(Date);
    expect(event.eventData).toEqual({
      id: '1',
      name: 'John Doe',
      address: '',
    });
  });

  it('should create a customer address changed event when address is an Address', () => {
    const address = new Address('Street 1', '12345678', 'City', '1');
    const event = new CustomerAddressChangedEvent({
      id: '1',
      name: 'John Doe',
      address: address,
    });

    expect(event.dateTimeOcurred).toBeInstanceOf(Date);
    expect(event.eventData).toEqual({
      id: '1',
      name: 'John Doe',
      address: address,
    });
  });

  it('should notify when a customer address is changed', () => {
    const customerAddressChangedEventSpy = jest.spyOn(
      SendConsoleLogHandler.prototype,
      'handle',
    );
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street 1', '12345678', 'City', '1');
    customer.changeAddress(address);

    expect(customer.address).toEqual(address);
    expect(customerAddressChangedEventSpy).toHaveBeenCalledTimes(1);
  });

  it('should not notify when customer address is invalid', () => {
    const customerAddressChangedEventSpy = jest.spyOn(
      SendConsoleLogHandler.prototype,
      'handle',
    );
    const customer = new Customer('1', 'John Doe');

    expect(() =>
      customer.changeAddress(new Address('', '12345678', 'City')),
    ).toThrow('An valid street is required (length between 2 and 50)');

    expect(customer.address).toBeUndefined();
    expect(customerAddressChangedEventSpy).not.toHaveBeenCalled();
  });
});
