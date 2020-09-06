import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  checkRole() {
    const arr = localStorage.getItem('UserInfo');
    const value = arr[3];

    if (value != 'admin') {
      return false;
    } else {
      return true;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('Token') != null) return true;
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   const arr = localStorage.getItem('UserInfo');
  //   const value = arr[3];

  //   if (localStorage.getItem('Token') && (value === 'admin') != null)
  //     return true;

  //   this.router.navigate(['/']);
  //   return false;
  // }
}
