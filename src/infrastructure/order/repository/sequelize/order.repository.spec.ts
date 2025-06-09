import { afterEach, beforeEach, describe, it, expect } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import ProductModel from '../../../product/repository/sequelize/product.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import Product from '../../../../domain/product/entity/product';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Order from '../../../../domain/checkout/entity/order';
import OrderRepository from './order.repository';

describe('OrderRepository', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderItemModel,
      OrderModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('123 Main St', '12345678', 'Springfield', '1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findByPk('1', {
      include: ['items'],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '1',
          product_id: '1',
        },
      ],
    });
  });

  it('should delete an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('123 Main St', '12345678', 'Springfield', '1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    await orderRepository.delete(order.id);

    const orderModel = await OrderModel.findByPk('1', {
      include: ['items'],
    });

    expect(orderModel).toBeNull();
  });

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('123 Main St', '12345678', 'Springfield', '1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it('should throw an error when order not found', async () => {
    const orderRepository = new OrderRepository();

    await expect(orderRepository.find('1')).rejects.toThrow('Order not found');
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('123 Main St', '12345678', 'Springfield', '1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem1 = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );
    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      3,
    );

    const order1 = new Order('1', customer.id, [orderItem1]);
    const order2 = new Order('2', customer.id, [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order1, order2]);
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('123 Main St', '12345678', 'Springfield', '1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newProduct = new Product('2', 'Product 2', 200);
    await productRepository.create(newProduct);

    const newOrderItem = new OrderItem(
      '2',
      newProduct.name,
      newProduct.price,
      newProduct.id,
      3,
    );

    const newOrder = new Order('1', customer.id, [newOrderItem]);

    await orderRepository.update(newOrder);

    const orderModel = await OrderModel.findByPk('1', {
      include: ['items'],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: newOrder.total(),
      items: [
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: newOrderItem.quantity,
          order_id: '1',
          product_id: '2',
        },
      ],
    });
  });
});
