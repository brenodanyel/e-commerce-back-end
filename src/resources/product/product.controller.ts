import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async findProducts() {
    return this.productService.findProducts();
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.productService.findProduct(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
