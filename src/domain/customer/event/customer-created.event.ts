import EventInterface from '../../@shared/event/event.interface';

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: { [key: string]: any } = {};

  constructor(eventData: { [key: string]: any }) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
