import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  creteOrder(product: Product): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(product);
    return this.httpClient.post(environment.apiUrl + 'order/create', body, {
      headers: headers,
    });
  }

  getAllOrder(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(environment.apiUrl + 'order/', {
      headers: headers,
    });
  }

  getOrderById(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(environment.apiUrl + 'order/' + id, {
      headers: headers,
    });
  }

  updateByOrderId (id, order: Order): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(order);
    return this.httpClient.put(environment.apiUrl + 'order/'+ id, body, {
      headers: headers,
    });
  }
}
