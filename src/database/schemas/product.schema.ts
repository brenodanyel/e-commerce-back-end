import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: false })
  image: string;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
