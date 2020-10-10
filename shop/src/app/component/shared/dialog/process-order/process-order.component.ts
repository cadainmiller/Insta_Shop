import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  title: string;
  order: any;

  constructor() {}

  OrderUpdateForm = new FormGroup({
    status: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this.title)
  }
}
