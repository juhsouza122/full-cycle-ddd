import Product from '../entity/product';

export default class ProductService {
  static changePrices(products: Product[], percentage: number) {
    products.forEach((product) => {
      product.changePrice(product.price * (1 + percentage / 100));
    });
  }
}
