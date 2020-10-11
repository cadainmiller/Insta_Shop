import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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
    public bsModalRef: BsModalRef,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
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
    this.orderService
      .updateByOrderId(this.order.orderId, this.OrderUpdateForm.value)
      .subscribe((data) => {
        console.log(data);
        if (data) {
          this.bsModalRef.hide();
          //this.router.navigate(['dashboard/order'], { relativeTo: this.route });
          this.toastr.info('Order Has Been Updated :)');
        }
      });
  }
}
