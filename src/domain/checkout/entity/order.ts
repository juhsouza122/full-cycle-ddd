import OrderItem from './order_item';

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  private validate() {
    this.validateId();
    this.validateCustomerID();
  }

  private validateId() {
    if (this._id.trim().length < 1) {
      throw new Error('Order ID is required');
    }
  }

  private validateCustomerID() {
    if (this._customerId.trim().length < 1) {
      throw new Error('Customer ID is required');
    }
  }

  addItem(item: OrderItem) {
    this._items.push(item);
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
