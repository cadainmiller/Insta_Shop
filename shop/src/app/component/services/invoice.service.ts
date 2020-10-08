import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  createInvoice(order: Order): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(order);
    return this.httpClient.post(environment.apiUrl + 'invoice/create', body, {
      headers: headers,
    });
  }

}
