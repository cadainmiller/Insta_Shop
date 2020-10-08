import { Address } from './address.model';
import { CustomerInfo } from './customerInfo.model';
import { Product } from './product.model';

export class Order {
  orderId = '';
  customer_info = CustomerInfo;
  products = [Product];
  notes: string | any;
  total = 0;
  tax = 0;
  final_cost = 0;
  shipping = 0;
  shipping_address = Address;
}
