import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/app/component/services/order.service';
import { ViewOrderComponent } from 'src/app/component/shared/dialog/view-order/view-order.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  bsModalRef: BsModalRef;
  config: any;
  collection = { count: 60, data: [] };
  orders: [];
  orderInfo: any;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService
  ) {
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

  openThisOrder(id) {
    const initialState = {
      title: 'View Order',
      action: 'view',
      orderInfo: this.orderInfo,
      id: id,
    };
    this.bsModalRef = this.modalService.show(ViewOrderComponent, {
      initialState,
      class: 'modal-lg modal-dialog-centered',
    });
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
}
