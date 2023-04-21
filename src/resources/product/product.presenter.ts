import { ProductDocument } from '../../database/schemas/product.schema';

export class ProductPresenter {
  public id: string;
  public name: string;
  public price: number;
  public qty: number;
  public image?: string;

  constructor(input: ProductDocument) {
    this.id = input._id.toString();
    this.name = input.name;
    this.price = input.price;
    this.qty = input.qty;
    this.image = input.image;
  }
}
