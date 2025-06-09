import { describe, expect, it, jest } from '@jest/globals';
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import EventDispatcher from './event-dispatcher';
import ProductCreatedEvent from '../../product/event/product-created.event';

describe('EventDispatcher domain event tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'],
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'].length,
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0],
    ).toEqual(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0],
    ).toEqual(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'].length,
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0],
    ).toEqual(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers()).toEqual({});
  });

  it('should notify an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0],
    ).toEqual(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10,
      createdAt: new Date(),
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
