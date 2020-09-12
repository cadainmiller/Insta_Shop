import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  creteProduct(product: Product): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(product);
    return this.httpClient.post(environment.apiUrl + 'product/add', body, {
      headers: headers,
    });
  }
}
