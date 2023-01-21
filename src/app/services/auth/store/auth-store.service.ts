import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { BehaviorSubject, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  //private user$: BehaviorSubject<User> = new BehaviorSubject<User>({});

  private isLoggedIn$ = of(false);

  private isLoggedOut$ = of(true);

  constructor() {

    const cookie = document.cookie;

    if (cookie) {

      this.isLoggedIn$ = cookie.includes('XSRF-TOKEN') ? of(true) : of(false);

      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

    }

  }

  setUser(user: User) {

    //this.user$.next(user);

    this.isLoggedIn$ = of(true);

    this.isLoggedOut$ = of(false);

  }

  removeUser() {

    //this.user$.next({});

    this.isLoggedIn$ = of(false);

    this.isLoggedOut$ = of(true);

  }

  getIsLoggedIn(): Observable<boolean> {

    return this.isLoggedIn$;

  }

}
