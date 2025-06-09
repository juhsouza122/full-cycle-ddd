import ProductInterface from './product.interface';

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validateName();
  }

  changePrice(price: number) {
    this._price = price;
    this.validatePrice();
  }

  private validateId() {
    if (this._id.trim().length < 1) {
      throw new Error('Product ID is required');
    }
  }

  private validateName() {
    if (this._name.trim().length < 2) {
      throw new Error('Product name is required');
    }
  }

  private validatePrice() {
    if (this._price < 0) {
      throw new Error('Product price does not allow negative values');
    }
  }

  private validate() {
    this.validateId();
    this.validateName();
    this.validatePrice();
  }
}
