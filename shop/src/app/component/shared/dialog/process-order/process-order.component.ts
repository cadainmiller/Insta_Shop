import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/component/services/order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  title: string;
  order: any;

  constructor(private orderService: OrderService) {}

  OrderUpdateForm = new FormGroup({
    status: new FormControl(''),
  });

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
      });
  }
}
