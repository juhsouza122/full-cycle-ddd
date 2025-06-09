import EventInterface from './event.interface';

export default interface EventHandlerInterface<
  T extends EventInterface = EventInterface,
> {
  handle(_event: T): void;
}
