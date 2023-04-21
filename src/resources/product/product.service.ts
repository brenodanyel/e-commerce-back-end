import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../database/schemas/product.schema';
import { ProductPresenter } from './product.presenter';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findProducts() {
    const products = await this.productModel.find();
    return products.map((product) => new ProductPresenter(product));
  }

  async createProduct(payload: CreateProductDto) {
    const existentProduct = await this.productModel.findOne({ name: payload.name });

    if (existentProduct) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productModel.create(payload);

    return new ProductPresenter(product);
  }

  async findProduct(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return new ProductPresenter(product);
  }

  async updateProduct(id: string, payload: UpdateProductDto) {
    const existentProduct = await this.productModel.findOne({ name: payload.name });

    if (existentProduct && existentProduct._id.toString() != id) {
      throw new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    const product = await this.productModel.findByIdAndUpdate(id, payload, { new: true });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return new ProductPresenter(product);
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return new ProductPresenter(product);
  }
}
