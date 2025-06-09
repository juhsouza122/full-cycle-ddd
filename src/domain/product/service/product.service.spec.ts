import { describe, it, expect } from '@jest/globals';
import Product from '../entity/product';
import ProductService from './product.service';

describe('ProductService unit tests', () => {
  it('should change prices os all products', () => {
    const products = [
      new Product('1', 'Product 1', 100),
      new Product('2', 'Product 2', 200),
    ];

    ProductService.changePrices(products, 100);

    expect(products[0].price).toBe(200);
    expect(products[1].price).toBe(400);
  });

  it('should not change prices if percentage is zero', () => {
    const products = [
      new Product('1', 'Product 1', 100),
      new Product('2', 'Product 2', 200),
    ];

    ProductService.changePrices(products, 0);

    expect(products[0].price).toBe(100);
    expect(products[1].price).toBe(200);
  });

  it('should not change prices if percentage is negative', () => {
    const products = [
      new Product('1', 'Product 1', 100),
      new Product('2', 'Product 2', 200),
    ];

    ProductService.changePrices(products, -15);

    expect(products[0].price).toBe(85);
    expect(products[1].price).toBe(170);
  });
});
