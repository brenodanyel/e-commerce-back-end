import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductSchema } from '../schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
})
export class ProductSeed {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async onModuleInit() {
    const products: Product[] = [
      {
        name: 'Product 1',
        image: 'https://picsum.photos/200/300',
        price: 100,
        qty: 10,
      },
      {
        name: 'Product 2',
        image: 'https://picsum.photos/200/300',
        price: 1549,
        qty: 10,
      },
    ];

    for (const product of products) {
      const productExists = await this.productModel.findOne({
        name: product.name,
      });

      if (!productExists) {
        await this.productModel.create(product);
      }
    }

    console.log('Product seed completed successfully');
  }
}
