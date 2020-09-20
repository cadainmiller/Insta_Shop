import { Address } from './address.model';
import { Product } from './product.model';

export class Oder {
  orderId = '';
  products = [Product];
  notes: string | any;
  total = 0;
  tax = 0;
  final_cost = 0;
  shipping = 0;
  shipping_address = Address;
}
