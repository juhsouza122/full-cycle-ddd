import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }

  async update(_entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize?.transaction();

    const orderModelExists = await OrderModel.findByPk(_entity.id);

    if (!orderModelExists) {
      throw new Error('Order not found');
    }

    try {
      await OrderModel.update(
        {
          customer_id: _entity.customerId,
          total: _entity.total(),
        },
        {
          where: {
            id: _entity.id,
          },
          transaction,
        },
      );

      const currentItems = await OrderItemModel.findAll({
        where: {
          order_id: _entity.id,
        },
        transaction,
      });

      const currentItemsMap = new Map(
        currentItems.map((item) => [item.id, item]),
      );

      const itemsToUpdate = [];
      const itemsToCreate = [];
      const itemsToDelete = [];

      for (const item of _entity.items) {
        if (currentItemsMap.has(item.id)) {
          itemsToUpdate.push(item);
          currentItemsMap.delete(item.id);
        } else {
          itemsToCreate.push(item);
          currentItemsMap.delete(item.id);
        }
      }

      for (const item of currentItemsMap.values()) {
        itemsToDelete.push(item);
      }

      if (itemsToUpdate.length > 0) {
        await Promise.all(
          itemsToUpdate.map((item) =>
            OrderItemModel.update(
              {
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              },
              {
                where: {
                  id: item.id,
                },
                transaction,
              },
            ),
          ),
        );
      }

      if (itemsToCreate.length > 0) {
        await OrderItemModel.bulkCreate(
          itemsToCreate.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: _entity.id,
          })),
          {
            transaction,
          },
        );
      }

      if (itemsToDelete.length > 0) {
        await OrderItemModel.destroy({
          where: {
            id: itemsToDelete.map((item) => item.id),
          },
          transaction,
        });
      }

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw error;
    }
  }

  async delete(_id: string): Promise<void> {
    const transaction = await OrderModel.sequelize?.transaction();

    try {
      await OrderItemModel.destroy({
        where: {
          order_id: _id,
        },
        transaction,
      });

      await OrderModel.destroy({
        where: {
          id: _id,
        },
        transaction,
      });

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw error;
    }
  }

  async find(_id: string): Promise<Order> {
    const orderModel = await OrderModel.findByPk(_id, {
      include: ['items'],
    });

    if (!orderModel) {
      throw new Error('Order not found');
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
          ),
      ),
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] });

    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity,
              ),
          ),
        ),
    );
  }
}
