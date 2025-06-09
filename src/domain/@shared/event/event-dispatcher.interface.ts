import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default interface EventDispatcherInterface {
  notify(_event: EventInterface): void;
  register(_eventName: string, _eventHandler: EventHandlerInterface): void;
  unregister(_eventName: string, _eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}
