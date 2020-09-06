import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  creteUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.httpClient.post(environment.apiUrl + 'user/register', body, {
      headers: headers,
    });
  }

  loginUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.httpClient.post(environment.apiUrl + 'user/login', body, {
      headers: headers,
    });
  }

  // getProtectedData(): Observable<any> {
  //   return this.httpClient.get(environment.apiUrl + 'user/');
  // }
}
