import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from './customer.model';
import CustomerRepository from './customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';

describe('CustomerRepository', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', '12345678', 'Springfield', '1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findByPk('1');

    expect(customerModel).not.toBeNull();
    expect(customerModel?.toJSON()).toEqual({
      id: '1',
      name: 'John Doe',
      street: 'Main Street',
      number: '1',
      zipCode: '12345678',
      city: 'Springfield',
      active: true,
      rewardPoints: 0,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', '12345678', 'Springfield', '1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName('Jane Doe');
    customer.changeAddress(
      new Address('Second Street', '87654321', 'Springfield', '2'),
    );

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findByPk('1');

    expect(customerModel).not.toBeNull();
    expect(customerModel?.toJSON()).toEqual({
      id: '1',
      name: 'Jane Doe',
      street: 'Second Street',
      number: '2',
      zipCode: '87654321',
      city: 'Springfield',
      active: true,
      rewardPoints: 0,
    });
  });

  it('should delete a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', '12345678', 'Springfield', '1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    await customerRepository.delete('1');

    const customerModel = await CustomerModel.findByPk('1');

    expect(customerModel).toBeNull();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', '12345678', 'Springfield', '1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find('1');

    expect(foundCustomer).toStrictEqual(customer);
  });

  it('should find a customer and deactivate it', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', '12345678', 'Springfield', '1');
    customer.changeAddress(address);
    customer.deactivate();

    await customerRepository.create(customer);

    const customerFound = await customerRepository.find('1');

    expect(customerFound.isActive).toBe(false);
  });

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find('1')).rejects.toThrowError(
      'Customer not found',
    );
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('1', 'John Doe');
    const address1 = new Address('Main Street', '12345678', 'Springfield', '1');
    customer1.changeAddress(address1);

    const customer2 = new Customer('2', 'Jane Doe');
    const address2 = new Address(
      'Second Street',
      '87654321',
      'Springfield',
      '2',
    );
    customer2.changeAddress(address2);
    customer2.deactivate();

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toStrictEqual([customer1, customer2]);
  });
});
