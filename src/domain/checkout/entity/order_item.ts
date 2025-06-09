export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number,
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
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

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  private validate() {
    this.validateId();
    this.validateName();
    this.validatePrice();
    this.validateProductId();
    this.validateQuantity();
  }

  private validateId() {
    if (this._id.trim().length < 1) {
      throw new Error('Item ID is required');
    }
  }

  private validateName() {
    if (this._name.trim().length < 2) {
      throw new Error('Item name is required');
    }
  }

  private validatePrice() {
    if (this._price < 0) {
      throw new Error('Item price does not allow negative values');
    }
  }

  private validateQuantity() {
    if (this._quantity <= 0) {
      throw new Error('Item quantity must be greater than 0');
    }
  }

  private validateProductId() {
    if (this._productId.trim().length < 1) {
      throw new Error('Product ID is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validateName();
  }

  changePrice(price: number) {
    this._price = price;
    this.validatePrice();
  }

  changeQuantity(quantity: number) {
    this._quantity = quantity;
    this.validateQuantity();
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
