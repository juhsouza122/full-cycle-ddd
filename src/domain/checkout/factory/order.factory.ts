import { v7 as uuid } from 'uuid';
import Order from '../entity/order';
import OrderItem from '../entity/order_item';

interface OrderPropsInterface {
  customerId: string;
  items: {
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  static create(orderProps: OrderPropsInterface): Order {
    const items = orderProps.items.map((item) => {
      return new OrderItem(
        uuid(),
        item.name,
        item.price,
        item.productId,
        item.quantity,
      );
    });
    return new Order(uuid(), orderProps.customerId, items);
  }
}
