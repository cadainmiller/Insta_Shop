import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/app/component/services/order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  title: string;
  order: any;

  constructor(
    private orderService: OrderService,
    public bsModalRef: BsModalRef
  ) {}

  OrderUpdateForm = new FormGroup({
    status: new FormControl('', Validators.required),
  });

  get status() {
    return this.OrderUpdateForm.get('status');
  }

  updateOrder(body: any) {
    const updateOrderJson = body;
    //const invoiceId = id;
    return updateOrderJson;
  }

  ngOnInit(): void {
    console.log(this.order);
  }

  updateOrderStatus() {
    console.log(this.updateOrder(this.OrderUpdateForm.value));

    this.orderService
      .updateByOrderId(this.order.orderId, this.OrderUpdateForm.value)
      .subscribe((data) => {
        console.log(data);
        if (data) {
          this.bsModalRef.hide()
        }
      });
  }
}
