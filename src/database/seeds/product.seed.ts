import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductSeed {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async seed() {
    const products: Product[] = [
      {
        name: 'Product 1',
        image: 'https://picsum.photos/200/300',
        price: 100,
        qty: 10,
      },
      {
        name: 'Product 3',
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
  }
}
