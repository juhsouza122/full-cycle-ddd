import { afterEach, beforeEach, describe, it, expect } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from './product.model';
import Product from '../../../../domain/product/entity/product';
import ProductRepository from './product.repository';
describe('ProductRepository', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findByPk('1');

    expect(productModel).not.toBeNull();
    expect(productModel?.toJSON()).toEqual({
      id: '1',
      name: 'Product 1',
      price: 10,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const productUpdated = new Product('1', 'Product 2', 20);

    await productRepository.update(productUpdated);

    const productModel = await ProductModel.findByPk('1');

    expect(productModel).not.toBeNull();
    expect(productModel?.toJSON()).toEqual({
      id: '1',
      name: 'Product 2',
      price: 20,
    });
  });

  it('should delete a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    await productRepository.delete('1');

    const productModel = await ProductModel.findByPk('1');

    expect(productModel).toBeNull();
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const productFound = await productRepository.find('1');

    expect(productFound).toEqual(product);
  });

  it('should not find a product', async () => {
    const productRepository = new ProductRepository();

    try {
      await productRepository.find('1');
    } catch (error) {
      expect((error as Error).message).toBe('Product not found');
    }
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const productsFound = await productRepository.findAll();

    expect(productsFound).toEqual([product1, product2]);
  });
});
