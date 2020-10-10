import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  title: string;
  order: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.title)
  }
}
