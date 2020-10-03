import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { OrderService } from 'src/app/component/services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  orderInfo: any;
  id: string;
  action: string;
  title: string;
  savedData: any = [];
  productsData: any = [];

  constructor(public bsModalRef: BsModalRef) {}

  OrderForm = new FormGroup({
    orderId: new FormControl(''),
  });

  getProductsArray(data) {
    console.log(data);
    for (var item in data) {
      this.productsData = data[item].products;
    }
  }

  ngOnInit(): void {
    this.getProductsArray(this.savedData);
    console.log(this.productsData);
  }
}
