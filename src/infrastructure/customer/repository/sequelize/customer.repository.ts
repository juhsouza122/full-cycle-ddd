import Customer from '../../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../../domain/customer/value-object/address';
import CustomerModel from './customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(_entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: _entity.id,
      name: _entity.name,
      street: _entity.address.street,
      number: _entity.address.number,
      zipCode: _entity.address.zip,
      city: _entity.address.city,
      active: _entity.isActive,
      rewardPoints: _entity.rewardPoints,
    });
  }
  async update(_entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: _entity.name,
        street: _entity.address.street,
        number: _entity.address.number,
        zipCode: _entity.address.zip,
        city: _entity.address.city,
        active: _entity.isActive,
        rewardPoints: _entity.rewardPoints,
      },
      {
        where: {
          id: _entity.id,
        },
      },
    );
  }
  async delete(_id: string): Promise<void> {
    await CustomerModel.destroy({
      where: {
        id: _id,
      },
    });
  }
  async find(_id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findByPk(_id);
    if (!customerModel) {
      throw new Error('Customer not found');
    }
    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.zipCode,
      customerModel.city,
      customerModel.number,
    );
    customer.changeAddress(address);
    if (!customerModel.active) {
      customer.deactivate();
    }
    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.street,
        customerModel.zipCode,
        customerModel.city,
        customerModel.number,
      );
      customer.changeAddress(address);
      if (!customerModel.active) {
        customer.deactivate();
      }
      return customer;
    });
  }
}
