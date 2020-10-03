import { Component, OnInit } from '@angular/core';
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
  savedData: any = [];

  constructor(private orderService: OrderService) {}

  async getOrderById(id) {
    let something = await this.orderService
      .getOrderById(id)
      .subscribe((data) => {
        let obj = data;
        //console.log(obj)
        this.savedData.push({ name: 'you', description: 'what is array' });
      });

    console.log(this.savedData);
  }

  ngOnInit(): void {
    if (this.action === 'view') {
      this.orderService.getOrderById(this.id).subscribe((data) => {
        let obj = data;
        console.log(obj)
      });

    }
  }
}
