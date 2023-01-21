import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthStoreService } from '../store/auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authStoreService: AuthStoreService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.checkIfAuthenticated();

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.checkIfAuthenticated();

  }

  private checkIfAuthenticated(): Observable<boolean | UrlTree> {

    return this.authStoreService.getIsLoggedIn()
      .pipe(
        map(isLoggedIn => isLoggedIn ? true : this.router.parseUrl('login'))
      );

  }

}
