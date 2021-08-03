import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuth: boolean = false;

  constructor(private router: Router) {}

  setAuthenticationToTrue() {
    this.isAuth = true;
  }

  setAuthenticationToFalse() {
    this.isAuth = false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuth) {
      this.router.navigate(["/login"]);
    }

    return true;
  }

  
}
