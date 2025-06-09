import Product from '../../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import ProductModel from './product.model';
export default class ProductRepository implements ProductRepositoryInterface {
  async create(_entity: Product): Promise<void> {
    await ProductModel.create({
      id: _entity.id,
      name: _entity.name,
      price: _entity.price,
    });
  }
  async update(_entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: _entity.name,
        price: _entity.price,
      },
      {
        where: {
          id: _entity.id,
        },
      },
    );
  }
  async delete(_id: string): Promise<void> {
    await ProductModel.destroy({
      where: {
        id: _id,
      },
    });
  }
  async find(_id: string): Promise<Product> {
    const productModel = await ProductModel.findByPk(_id);
    if (!productModel) {
      throw new Error('Product not found');
    }
    return new Product(productModel.id, productModel.name, productModel.price);
  }
  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll();
    return productsModel.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price),
    );
  }
}
