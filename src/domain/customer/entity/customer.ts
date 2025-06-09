import EventDispatcher from '../../@shared/event/event-dispatcher';
import CustomerAddressChangedEvent from '../event/customer-address-changed.event';
import CustomerCreatedEvent from '../event/customer-created.event';
import SendConsoleLogHandler from '../event/handler/send-console-log-when-address-changed.handler';
import {
  SendConsoleLog1Handler,
  SendConsoleLog2Handler,
} from '../event/handler/send-console-log-when-customer-created.handler';
import Address from '../value-object/address';

class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.notifyWhenCustomerCreated();
  }

  private validate() {
    this.validateId();
    this.validateName();
  }

  private validateId() {
    if (this._id.trim().length === 0) {
      throw new Error('ID is required');
    }
  }

  private validateName() {
    if (this._name.trim().length < 2) {
      throw new Error('An valid name is required');
    }
  }

  private validateAlreadyActive() {
    if (this._active) {
      throw new Error('Customer is already active');
    }
  }

  private validateAlreadyInactive() {
    if (!this._active) {
      throw new Error('Customer is already inactive');
    }
  }

  private validateAddressToActivate() {
    if (!this._address) {
      throw new Error('Address is required to activate customer');
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get isActive(): boolean {
    return this._active;
  }

  changeName(newName: string) {
    this._name = newName;
    this.validateName();
  }

  activate() {
    this.validateAddressToActivate();
    this.validateAlreadyActive();
    this._active = true;
  }

  deactivate() {
    this.validateAlreadyInactive();
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
    if (this._rewardPoints < 0) {
      throw new Error('Reward points cannot be negative');
    }
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.notifyWhenCustomerAddressChanged();
  }

  private notifyWhenCustomerCreated() {
    const eventDispatcher = new EventDispatcher();
    const eventName = 'CustomerCreatedEvent';

    eventDispatcher.register(eventName, new SendConsoleLog1Handler());
    eventDispatcher.register(eventName, new SendConsoleLog2Handler());

    const userCreatedEvent = new CustomerCreatedEvent({
      id: this.id,
      name: this.name,
    });

    eventDispatcher.notify(userCreatedEvent);
  }

  private notifyWhenCustomerAddressChanged() {
    const eventDispatcher = new EventDispatcher();
    const eventName = 'CustomerAddressChangedEvent';

    eventDispatcher.register(eventName, new SendConsoleLogHandler());

    const userAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this.id,
      name: this.name,
      address: this.address,
    });

    eventDispatcher.notify(userAddressChangedEvent);
  }
}

export default Customer;
