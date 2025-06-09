import { describe, it, expect } from '@jest/globals';
import Product from './product';

describe('Product', () => {
  it('should create product', () => {
    const product = new Product('1', 'Product 1', 100);
    expect(product.id).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
  });

  it('should throw error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrow(
      'Product ID is required',
    );
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('Product name is required');
  });

  it('should throw error when price is negative', () => {
    expect(() => new Product('1', 'Product 1', -100)).toThrow(
      'Product price does not allow negative values',
    );
  });

  it('should change name', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should throw error when changing name to empty', () => {
    const product = new Product('1', 'Product 1', 100);
    expect(() => product.changeName('')).toThrow('Product name is required');
  });

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });

  it('should throw error when changing price to negative', () => {
    const product = new Product('1', 'Product 1', 100);
    expect(() => product.changePrice(-100)).toThrow(
      'Product price does not allow negative values',
    );
  });
});
