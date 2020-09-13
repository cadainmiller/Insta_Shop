import { ShippingDetails } from './shipping-details.model';

export class Product {
  name = '';
  description = '';
  product_image: string | any;
  productId = '';
  shipping_details = ShippingDetails;
  quantity = 0;
  sale = '';
  price = '';
  sale_price = 0;
}
