import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {IdGenerator} from 'src/app/component/analytics/idgenerator'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  title: string;
  closeBtnName: string;
  orderId = '';


  constructor(public bsModalRef: BsModalRef, private idGenerator: IdGenerator) {}

  ngOnInit(): void {
    console.log("PD" + this.idGenerator.uniqueId());
    this.orderId = "PD" + this.idGenerator.uniqueId();
  }
}
