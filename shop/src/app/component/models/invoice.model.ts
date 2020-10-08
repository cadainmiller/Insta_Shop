import { Order } from './order.model';

export class Invoice {
  invoiceId = '';
  order: Order;
  notes = '';
  invoiceDoc = '';
}
