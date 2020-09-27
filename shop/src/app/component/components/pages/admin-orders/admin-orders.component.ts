import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/component/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  config: any;
  collection = { count: 60, data: [] };
  orders:any;

  constructor(private orderService: OrderService) {

    
    this.orderService.getAllOrder().subscribe((data => {
      console.log(data)
      this.collection.data = data;
      //this.orders = data;

    }))

    this.config = {
      itemsPerPage: 13,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
  }

}
