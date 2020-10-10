import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Invoice } from 'src/app/component/models/invoice.model';
import { Order } from 'src/app/component/models/order.model';
import { InvoiceService } from 'src/app/component/services/invoice.service';
import { OrderService } from 'src/app/component/services/order.service';
import { ProcessOrderComponent } from 'src/app/component/shared/dialog/process-order/process-order.component';
import { ViewInvoiceComponent } from 'src/app/component/shared/dialog/view-invoice/view-invoice.component';
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
  savedData: any = [];

  constructor(
    private orderService: OrderService,
    private invoiceService: InvoiceService,
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

  sendInvoice(order: Order) {
    console.log(order.orderId);

    this.invoiceService.createInvoice(order).subscribe((data) => {
      console.log(data);
    });
  }

  emailInvoice(id: String) {
    //console.log(id)
    this.invoiceService.emailInvoiceByOrderId(id).subscribe((data) => {});
  }

  processOrder() {}

  openThisOrder(id) {
    this.orderService.getOrderById(id).subscribe((data) => {
      let obj = data;
      this.savedData.push(obj);
      const initialState = {
        title: 'View Order',
        action: 'view',
        orderInfo: this.orderInfo,
        id: id,
        savedData: this.savedData,
      };
      this.bsModalRef = this.modalService.show(ViewOrderComponent, {
        initialState,
        class: 'modal-lg modal-dialog-centered',
      });
      this.bsModalRef.content.closeBtnName = 'Cancel';
    });
  }

  openUpdateOrder(id) {
    this.orderService.getOrderById(id).subscribe((data) => {
      let obj = data;
      const initialState = {
        title: 'Update Order',
        order: obj,
      };
      this.bsModalRef = this.modalService.show(ProcessOrderComponent, {
        initialState,
        class: 'modal-lg modal-dialog-centered',
      });
      this.bsModalRef.content.closeBtnName = 'Cancel';
    });
  }

  viewInvoice(id) {
    this.invoiceService.getInvoiceByOrderId(id).subscribe((data) => {
      let obj = data;
      const initialState = {
        title: 'View Invoice',
        action: 'view',
        orderId: id,
        invoiceObj: obj,
      };
      this.bsModalRef = this.modalService.show(ViewInvoiceComponent, {
        initialState,
        class: 'modal-lg modal-dialog-centered',
      });
      this.bsModalRef.content.closeBtnName = 'Cancel';
    });
  }
}
