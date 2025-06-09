class Address {
  private _street: string;
  private _number?: string;
  private _zip: string;
  private _city: string;

  constructor(street: string, zip: string, city: string, number?: string) {
    this._street = street;
    this._number = number ?? 'S/N';
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  private validate() {
    this.validateStreet();
    this.validateNumber();
    this.validateZip();
    this.validateCity();
  }

  private validateStreet() {
    let streetLength = this._street.trim().length;
    if (streetLength < 2 || streetLength > 50) {
      throw new Error('An valid street is required (length between 2 and 50)');
    }
  }

  private validateNumber() {
    let numberLength = this._number!.trim().length;
    if (numberLength < 1 || numberLength > 10) {
      throw new Error('An valid number is required (length between 1 and 10)');
    }
  }

  private validateZip() {
    if (this._zip.trim().length < 8) {
      throw new Error('An valid zip is required');
    }
  }

  private validateCity() {
    if (this._city.trim().length < 2) {
      throw new Error('An valid city is required');
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number!;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}

export default Address;
