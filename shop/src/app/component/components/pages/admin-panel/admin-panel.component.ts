import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/component/services/product.service';
import { OrderService } from 'src/app/component/services/order.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  productsData: any = [];
  ordersData: any = [];

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.productService.getAllProduct().subscribe((data) => {
      this.productsData = data;
      console.log(this.productsData);
    });
    this.orderService.getAllOrder().subscribe((data) => {
      this.ordersData = data.Orders;
      console.log(this.ordersData);
    });
  }

  ngOnInit() {}
}
