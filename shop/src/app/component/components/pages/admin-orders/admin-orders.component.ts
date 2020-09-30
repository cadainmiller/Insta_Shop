import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/component/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  config: any;
  collection = { count: 60, data: [] };
  orders: [];

  constructor(private orderService: OrderService) {
    this.orderService.getAllOrder().subscribe((data) => {
      this.collection.data = data.Orders;
      console.log(this.collection.data);
    });

    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.collection.count,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {}

  sendInvoice(orderID: string) {
    console.log(orderID);
  }

  processOrder() {}
}
